import { createMemberExpressionNode } from "./MemberExpression.js";
import { createObjectExpression } from "./ObjectExpression.js";

const functionDeclarationTypes = ["ClassDeclaration", "FunctionDeclaration"];

const createVariableCollector = (variables) => {
  return {
    add(id, init, declaratorNode) {
      if (id === null) {
        return;
      }
      if (id.type === "Identifier") {
        variables.set(id.name, {
          type: "VariableDeclarator",
          loc: id.loc,
          id,
          init,
          parent: declaratorNode.parent,
        });
      } else if (id.type === "ObjectPattern") {
        if (init.type !== "ObjectExpression") {
          id.properties.forEach((property) => {
            if (property.type === "RestElement") {
              return this.add(property.argument, init, declaratorNode);
            }
            return this.add(
              property.value,
              createMemberExpressionNode(init, property.key.name),
              declaratorNode,
            );
          });
          return;
        }
        const objectExpression = createObjectExpression(init);
        id.properties.forEach((property) => {
          if (property.type === "RestElement") {
            return this.add(property.argument, init, declaratorNode);
          }
          const propValue = objectExpression.getValue(property.key.name);
          if (propValue) {
            return this.add(property.value, propValue, declaratorNode);
          }
        });
      } else if (id.type === "ArrayPattern") {
        id.elements.forEach((element, index) => {
          if (element?.type === "RestElement") {
            this.add(element.argument, init, declaratorNode);
            return;
          }
          let elementValue;
          if (init.type === "ArrayExpression") {
            elementValue = init.elements[index] ?? null;
          } else {
            elementValue = createMemberExpressionNode(init, index, "Literal");
            elementValue.property.parent = elementValue;
          }
          this.add(element, elementValue, declaratorNode);
        });
      }
    },
  };
};

const createBlockStatement = (node) => {
  const variables = new Map();
  const variableCollector = createVariableCollector(variables);
  node.body.forEach((node) => {
    if (functionDeclarationTypes.includes(node.type)) {
      variables.set(node.id.name, node);
    } else if (node.type === "VariableDeclaration") {
      node.declarations.forEach((declarator) => {
        variableCollector.add(declarator.id, declarator.init, declarator);
      });
    }
  });
  return {
    getVariable: (name) => variables.get(name),
  };
};

export { createBlockStatement };
