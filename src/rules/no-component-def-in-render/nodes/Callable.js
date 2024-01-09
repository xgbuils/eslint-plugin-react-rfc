import { getIdentifiers } from "../utils/getIdentifiers.js";

const getParamIdentifiers = (node) => node.params.flatMap(getIdentifiers);

const nullishCallable = {
  getParam() {
    return;
  },
  getName() {
    return "";
  },
};

const createCallable = (node) => {
  if (node.type === "Program") {
    return nullishCallable;
  }

  const identifiers = getParamIdentifiers(node);
  const paramIdentifiers = new Map(identifiers.map((id) => [id.name, id]));

  return {
    getParam(paramName) {
      return paramIdentifiers.get(paramName);
    },
    getName() {
      if (node.id?.name) {
        return node.id.name;
      }
      const parent = node.parent;
      if (parent.type === "MethodDefinition") {
        return parent.key.name === "render"
          ? parent.parent.parent.id.name
          : parent.key.name;
      }
      return parent.id?.name;
    },
  };
};

export { createCallable };
