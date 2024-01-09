import { createCallable } from "./nodes/Callable.js";
import { createComponentDefinitionInRenderValidator } from "./utils/errorCollector.js";
import { createParentTraverser } from "./utils/parentTraverser.js";

const avoidComponentDefInRender =
  "Do not define component {{ componentName }} in the same scope is rendered. Move the component definition out of the {{ functionName }} scope. More info: https://react.dev/learn/your-first-component#nesting-and-organizing-components";

const createReporter = (context, componentName) => ({
  report: (functionName, nodes) => {
    if (nodes.length > 0) {
      nodes.forEach((node) => {
        context.report({
          node,
          messageId: "avoidComponentDefInRender",
          data: {
            componentName,
            functionName: functionName ?? "function",
          },
        });
      });
    }
  },
});

const validate = (context, node, componentName) => {
  const reporter = createReporter(context, componentName);
  const parentTraverser = createParentTraverser(node);
  const validator = createComponentDefinitionInRenderValidator(
    context,
    componentName,
  );

  parentTraverser
    .forEach((node) => {
      if (node.type === "BlockStatement") {
        validator.evaluateVariables(node);
      }
    })
    .end((node) => {
      const callable = createCallable(node);
      validator.evaluateParams(callable);
      const nodes = validator.getInvalidDefinitions();
      reporter.report(callable.getName(), nodes);
    });
};

export default {
  meta: {
    messages: {
      avoidComponentDefInRender,
    },
    type: "problem",
    docs: {
      recommended: true,
      description: "disallow to define a component in render scope",
      url: "https://react.dev/learn/your-first-component#nesting-and-organizing-components",
    },
    fixable: null,
    hasSuggestions: false,
    schema: [
      {
        type: "object",
        properties: {
          allowComponentMap: {
            type: "boolean",
          },
          allowNullishOperator: {
            type: "boolean",
          },
          allowOrOperator: {
            type: "boolean",
          },
          allowTernary: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    return {
      JSXElement(node) {
        validate(context, node, node.openingElement.name.name);
      },
      Identifier(node) {
        const parentNode = node?.parent;
        if (parentNode?.type !== "CallExpression") {
          return;
        }
        const calleeNode = parentNode.callee;
        if (calleeNode.object?.name !== "React") {
          return;
        }
        if (calleeNode.property.name !== "createElement") {
          return;
        }
        validate(context, node, node.name);
      },
    };
  },
};
