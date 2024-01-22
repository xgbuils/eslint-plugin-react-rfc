import { createMemberExpressionNode } from "./MemberExpression.js";
import { createObjectExpression } from "./ObjectExpression.js";

const functionDeclarationTypes = ["ClassDeclaration", "FunctionDeclaration"];

const createVariableCollector = (variables) => {
  const add = (id, init, declaratorNode) => {
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
      const expressionCollector = createInitValueExpressionCollector(
        init,
        declaratorNode,
      );
      id.properties.forEach((property) => expressionCollector.add(property));
    } else if (id.type === "ArrayPattern") {
      id.elements.forEach((element, index) => {
        if (element?.type === "RestElement") {
          add(element.argument, init, declaratorNode);
          return;
        }
        let elementValue;
        if (init.type === "ArrayExpression") {
          elementValue = init.elements[index] ?? null;
        } else {
          elementValue = createMemberExpressionNode(init, index, "Literal");
          elementValue.property.parent = elementValue;
        }
        add(element, elementValue, declaratorNode);
      });
    }
  };

  const createInitValueExpressionCollector = (init, declaratorNode) => {
    const expressionCollector =
      init.type === "ObjectExpression"
        ? createObjectExpressionCollector(init, declaratorNode)
        : createNoObjectExpressionCollector(init, declaratorNode);
    return {
      add: (property) => {
        if (property.type === "RestElement") {
          return add(property.argument, init, declaratorNode);
        }
        expressionCollector.add(property);
      },
    };
  };

  const createNoObjectExpressionCollector = (init, declaratorNode) => {
    return {
      add: (property) => {
        return add(
          property.value,
          createMemberExpressionNode(init, property.key.name),
          declaratorNode,
        );
      },
    };
  };

  const createObjectExpressionCollector = (init, declaratorNode) => {
    const objectExpression = createObjectExpression(init);
    return {
      add: (property) => {
        const propValue = objectExpression.getValue(property.key.name);
        if (propValue) {
          return add(property.value, propValue, declaratorNode);
        }
      },
    };
  };

  return { add };
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
