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
        id.properties.forEach((property) => {
          let propValue;
          if (init.type === "ObjectExpression") {
            propValue =
              init.properties.find(
                (propValue) => propValue.key.name === property.key.name,
              ).value ?? null;
          } else {
            propValue = {
              type: "MemberExpression",
              object: init,
              property: {
                type: "Identifier",
                name: property.key.name,
              },
            };
            propValue.property.parent = propValue;
          }
          this.add(property.value, propValue, declaratorNode);
        });
      } else if (id.type === "ArrayPattern") {
        id.elements.forEach((element, index) => {
          let elementValue;
          if (init.type === "ArrayExpression") {
            elementValue = init.elements[index] ?? null;
          } else {
            elementValue = {
              type: "MemberExpression",
              object: init,
              property: {
                type: "Literal",
                name: index,
                raw: `${index}`,
              },
            };
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
