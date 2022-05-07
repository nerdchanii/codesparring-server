import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const LANGUAGE = {
  JS: {
    NAME: "javascript",
    EXT: "js",
  },
  PYTHON: {
    NAME: "python",
    EXT: "py",
  },
};

const glotUrlMaker = (lang) =>
  // TODO: ioslate API_URL to config file
`${process.env.GLOT_API_URL}/api/run/${lang}/latest`;

const glotDataMaker = (input, lang, code) => {
  let ext;
  switch(lang) {
    case LANGUAGE.JS.NAME:
      ext = LANGUAGE.JS.EXT;
      break;
    case LANGUAGE.PYTHON.NAME:
      ext = LANGUAGE.PYTHON.EXT;
      break;
    default:
      throw new Error("Language not supported");
  }
  return {
    stdin: input,
    files: [
      {
        name: `solution.${ext}`,
        content: code,
      },
    ],
  };
};



export const fetchGlot = async ({ stdin, lang, code, output }) => {
  const response = await axios.post(glotUrlMaker(lang), glotDataMaker(stdin, lang, code, output), {
    headers: {
      // TODO: isolate this key to a config file
      Authorization: process.env.GLOT_API_KEY,
      "Content-Type": "application/json",
    },
  });
  const { stdout, stderr } = response.data; 
  return { stdout, stderr }; 
};
