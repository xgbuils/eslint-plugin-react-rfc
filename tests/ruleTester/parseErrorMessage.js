const tokens = {
  space: "\\s+",
  openObject: "\\{",
  closeObject: "\\}",
  openArray: "\\[",
  closeArray: "\\]",
  comma: ",",
  colon: ":",
  numberValue: "\\d+",
  stringValue: "'(?:\\\\'|[^'])*'",
  key: "\\w+",
};

const createLexer = (tokens, text = "") => {
  const pattern = Object.entries(tokens)
    .map(([type, regExp]) => `(?<${type}>${regExp})`)
    .join("|");
  const regExp = new RegExp(pattern, "mg");
  let index = 0;
  return {
    getToken() {
      const match = regExp.exec(text);
      if (!match || match.index !== index) {
        return null;
      }
      index = match.index + match[0].length;
      const [type, value] = Object.entries(match.groups).find(
        ([, value]) => value,
      );
      return {
        type,
        value,
        index: match.index,
      };
    },
  };
};

const map = {
  INIT: {
    openArray: {
      state: "ARRAY",
      transform: () => [],
    },
  },
  ARRAY: {
    openObject: {
      state: "OBJECT",
      transform: (value) => ({
        array: value,
        object: {},
      }),
    },
    closeArray: {
      state: "END",
      transform: (value) => value,
    },
  },
  OBJECT: {
    key: {
      state: "KEY",
      transform: (value, token) => ({
        ...value,
        key: token.value,
      }),
    },
    closeObject: {
      state: "OBJECT_COMPLETED",
      transform: (value) => ({
        array: [...value.array, value.object],
      }),
    },
  },
  KEY: {
    colon: {
      state: "WAITING_FOR_VALUE",
      transform: (value) => value,
    },
  },
  WAITING_FOR_VALUE: {
    stringValue: {
      state: "VALUE_COMPLETED",
      transform: (value, token) => ({
        array: value.array,
        object: {
          ...value.object,
          [value.key]: token.value.slice(1, -1),
        },
      }),
    },
    numberValue: {
      state: "VALUE_COMPLETED",
      transform: (value, token) => ({
        array: value.array,
        object: {
          ...value.object,
          [value.key]: parseFloat(token.value),
        },
      }),
    },
  },
  VALUE_COMPLETED: {
    comma: {
      state: "OBJECT",
      transform: (value) => value,
    },
    closeObject: {
      state: "OBJECT_COMPLETED",
      transform: (value) => value,
    },
  },
  OBJECT_COMPLETED: {
    comma: {
      state: "ARRAY",
      transform: (value) => ({
        array: [...value.array, value.object],
      }),
    },
    closeArray: {
      state: "END",
      transform: (value) =>
        value.object ? [...value.array, value.object] : value.array,
    },
  },
};

const parseMessageObject = (text) => {
  const lexer = createLexer(tokens, text);
  let state = "INIT";
  let value;

  do {
    const token = lexer.getToken();
    if (!token) {
      throw {
        state,
        token,
      };
    }
    if (token.type === "space") {
      continue;
    }

    const next = map[state][token.type];
    if (!next) {
      throw {
        state,
        token,
      };
    }
    state = next.state;
    value = next.transform(value, token);
  } while (state !== "END");
  return value;
};

export const parseErrorMessage = (error) => {
  const contentEnd = error.message.indexOf(":");
  const message = error.message.slice(0, contentEnd);
  const rawErrorInfo = error.message.slice(contentEnd + 1);
  if (error.code === "ERR_ASSERTION" && typeof error.expected === "string") {
    return { message };
  }

  try {
    const errors = parseMessageObject(rawErrorInfo);
    return {
      message,
      errors,
    };
  } catch (unexpectedError) {
    return {
      message: error.message,
    };
  }
};
