// make LANGUAGE object
const JAVASCRIPT = {
  NAME: "javascript",
  EXT: "js",
};
const PYTHON = {
  NAME: "python",
  EXT: "py",
};

export const makeData = (stdin, lang, code) => {
  let ext;

  switch (lang) {
    case JAVASCRIPT.NAME:
      ext = JAVASCRIPT.EXT;
      break;
    case "python":
      ext = PYTHON.EXT;
      break;
    default:
      throw new Error("Language not supported");
  }

  return {
    stdin: stdin,
    files: [
      {
        name: `solution.${ext}`,
        content: code,
      },
  ],
  };
};

export default makeData;
