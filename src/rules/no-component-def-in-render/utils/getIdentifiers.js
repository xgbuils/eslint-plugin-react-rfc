const getIdentifiers = (node) => {
  if (node.type === "Identifier") {
    return [node];
  }
  if (node.type === "ObjectPattern") {
    return node.properties.flatMap(({ type, value, argument }) =>
      getIdentifiers(type === "RestElement" ? argument : value),
    );
  }
  if (node.type === "ArrayPattern") {
    return node.elements.flatMap((element) =>
      getIdentifiers(
        element.type === "RestElement" ? element.argument : element,
      ),
    );
  }
  return [];
};

export { getIdentifiers };
