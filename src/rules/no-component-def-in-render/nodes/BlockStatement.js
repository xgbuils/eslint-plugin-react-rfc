const functionDeclarationTypes = ["ClassDeclaration", "FunctionDeclaration"];

const parseInitValueProperties = (properties) => {
  let spread;
  const propValues = {};
  if (properties) {
    properties.forEach((property) => {
      if (property.type === "Property") {
        propValues[property.key.name] = property;
      } else if (property.type === "SpreadElement") {
        spread = property.argument;
      }
    });
  }
  return {
    spread,
    propValues,
  };
};

const createMembershipExpression = (object, key) => {
  const node = {
    type: "MemberExpression",
    object,
    property: {
      type: "Identifier",
      name: key,
    },
  };
  node.property.parent = node;
  return node;
};

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
        const { spread, propValues } = parseInitValueProperties(
          init.properties,
        );
        id.properties.forEach((property) => {
          if (property.type === "RestElement") {
            return this.add(property.argument, init, declaratorNode);
          }
          if (init.type !== "ObjectExpression") {
            return this.add(
              property.value,
              createMembershipExpression(init, property.key.name),
              declaratorNode,
            );
          }
          const propValue = propValues[property.key.name];
          if (propValue) {
            return this.add(property.value, propValue.value, declaratorNode);
          }
          if (spread) {
            return this.add(
              property.value,
              createMembershipExpression(spread, property.key.name),
              declaratorNode,
            );
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
