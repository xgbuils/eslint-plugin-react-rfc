import { createCallable } from "../nodes/Callable.js";

const isParentPredicateMap = {
  MethodDefinition: (node) => node.type === "FunctionExpression",
  FunctionDeclaration: () => true,
  ArrowFunctionExpression: (node) => node.parent.type !== "CallExpression",
  FunctionExpression: (node) =>
    !["CallExpression", "MethodDefinition"].includes(node.parent.type),
};
const never = () => false;

const parseNode = (node) => {
  const isMethod = node?.type === "MethodDefinition";
  const functionNode = isMethod ? node.value : node;
  const isParentPredicate = isParentPredicateMap[node.type] || never;
  const isParent = isParentPredicate(functionNode);
  return {
    node,
    functionNode,
    isParent,
    isMethod,
  };
};

const createParentTraverser = (node) => {
  return {
    forEach(callback) {
      let result = parseNode(node);
      while (!result.isParent) {
        callback(result.node);
        result = parseNode(result.node.parent);
      }
      return {
        end(callback) {
          const callable = createCallable(result.functionNode);
          callback(callable);
        },
      };
    },
  };
};

export { createParentTraverser };
