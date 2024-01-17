import { createMemberExpressionNode } from "./MemberExpression.js";

export const createObjectExpression = ({ properties }) => {
  const lastIndex = properties.length - 1;
  let list = [];
  const map = new Map();
  for (let index = lastIndex; index >= 0; --index) {
    const property = properties[index];
    if (property.type === "SpreadElement") {
      list.push(property);
    } else if (property.type === "Property") {
      if (map.has(property.key.name)) {
        break;
      }
      const newList = [...list];
      list.push(property);
      map.set(property.key.name, list);
      list = newList;
    } else {
      throw new Error("Unexpected error");
    }
  }

  const createRight = (item, keyName) => {
    return item.type === "SpreadElement"
      ? createMemberExpressionNode(item.argument, keyName)
      : item.value;
  };

  const createEquivalentValue = (items, keyName) => {
    const { length } = items;
    let currentItem = createRight(items[0], keyName);
    for (let index = 1; index < length; ++index) {
      const item = items[index];
      const right = createRight(item, keyName);
      currentItem = {
        type: "LogicalExpression",
        operator: "??",
        left: currentItem,
        right,
      };
    }
    return currentItem;
  };

  return {
    getValue: (keyName) => {
      const items = map.get(keyName);
      return createEquivalentValue(items ?? list, keyName);
    },
  };
};
