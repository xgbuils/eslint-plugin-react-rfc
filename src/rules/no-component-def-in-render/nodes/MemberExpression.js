export const createMemberExpressionNode = (
  object,
  key,
  type = "Identifier",
) => {
  const node = {
    type: "MemberExpression",
    object,
    property: {
      type,
      name: key,
      raw: `${key}`,
    },
  };
  node.property.parent = node;
  return node;
};
