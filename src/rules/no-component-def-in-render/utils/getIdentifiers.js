const getIdentifiers = (node) => {
  if (node.type === "Identifier") {
    return [node];
  }
  if (node.type === "ObjectPattern") {
    return node.properties.flatMap(({ value }) => getIdentifiers(value));
  }
  if (node.type === "ArrayPattern") {
    return node.elements.flatMap((element) => getIdentifiers(element));
  }
  return [];
};

export { getIdentifiers };
