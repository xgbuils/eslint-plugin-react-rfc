import { createBlockStatement } from "../nodes/BlockStatement.js";

const calculateOptions = (context) => {
  const options = context.options[0] ?? {};
  return {
    allowOrOperator: true,
    allowNullishOperator: true,
    allowComponentMap: true,
    allowTernary: true,
    ...options,
  };
};

export const createComponentDefinitionInRenderValidator = (
  context,
  componentName,
) => {
  const options = calculateOptions(context);
  let currentVariableNames = [componentName];
  const invalidVariableValues = [];
  return {
    evaluateVariables(node) {
      const blockStatement = createBlockStatement(node);
      let freeVariables = new Set();
      let currentVariableValues;
      let nextVariableValues = currentVariableNames.reduce(
        (result, variableName) => {
          const variable = blockStatement.getVariable(variableName);
          if (variable) {
            if (variable.type === "VariableDeclarator") {
              result.push(variable.init);
            } else {
              result.push(variable);
            }
          } else {
            freeVariables.add(variableName);
          }
          return result;
        },
        [],
      );
      while (nextVariableValues.length > 0) {
        currentVariableValues = nextVariableValues;
        nextVariableValues = [];
        for (const variableValue of currentVariableValues) {
          if (
            options.allowOrOperator &&
            variableValue.type === "LogicalExpression" &&
            variableValue.operator == "||"
          ) {
            nextVariableValues.push(variableValue.left);
            nextVariableValues.push(variableValue.right);
          } else if (
            options.allowNullishOperator &&
            variableValue.type === "LogicalExpression" &&
            variableValue.operator == "??"
          ) {
            nextVariableValues.push(variableValue.left);
            nextVariableValues.push(variableValue.right);
          } else if (
            options.allowComponentMap &&
            variableValue.type === "MemberExpression"
          ) {
            nextVariableValues.push(variableValue.object);
          } else if (
            options.allowTernary &&
            variableValue.type === "ConditionalExpression"
          ) {
            nextVariableValues.push(variableValue.consequent);
            nextVariableValues.push(variableValue.alternate);
          } else if (variableValue.type === "Identifier") {
            const nextVariable = blockStatement.getVariable(variableValue.name);
            if (nextVariable) {
              nextVariableValues.push(nextVariable.init);
            } else {
              freeVariables.add(variableValue.name);
            }
          } else {
            invalidVariableValues.push(variableValue);
          }
        }
      }
      currentVariableNames = [...freeVariables];
    },
    evaluateParams(callable) {
      currentVariableNames.forEach((freeVariable) => {
        const invalidDefinition = callable.getParam(freeVariable);
        if (invalidDefinition) {
          invalidVariableValues.push(invalidDefinition);
        }
      });
    },
    getInvalidDefinitions() {
      return invalidVariableValues;
    },
  };
};
