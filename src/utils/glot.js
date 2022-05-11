import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const LANGUAGE = {
  JS: {
    NAME: 'javascript',
    EXT: 'js',
  },
  PYTHON: {
    NAME: 'python',
    EXT: 'py',
  },
};

const glotUrlMaker = (lang) =>
  // TODO: ioslate API_URL to config file
  `${process.env.GLOT_API_URL}/${lang}/latest`;

const glotDataMaker = ({ input, lang, code }) => {
  let ext;
  let stdin;
  switch (lang) {
    case LANGUAGE.JS.NAME:
      ext = LANGUAGE.JS.EXT;
      break;
    case LANGUAGE.PYTHON.NAME:
      ext = LANGUAGE.PYTHON.EXT;
      break;
    default:
      throw new Error('Language not supported');
  }
  switch (typeof input) {
    case 'string':
      stdin = input;
      break;
    case 'object':
      stdin = JSON.stringify(input);
      if (stdin.startsWith('[') && stdin.endsWith(']')) {
        stdin = stdin.slice(1, -1);
      }
      break;
    case 'number':
    case 'boolean':
      stdin = input.toString();
      break;
    default:
      break;
  }

  return {
    stdin,
    files: [
      {
        name: `solution.${ext}`,
        content: code,
      },
    ],
  };
};

export const fetchGlot = async ({ input, lang, code }) => {
  const url = glotUrlMaker(lang);
  const data = glotDataMaker({ input, lang, code });
  const response = await axios.post(url, data, {
    headers: {
      // TODO: isolate this key to a config file
      Authorization: process.env.GLOT_API_KEY,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};
