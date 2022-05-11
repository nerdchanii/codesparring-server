import { fetchGlot } from '../utils/glot';

export default class CodeService {
  constructor(model) {
    this._model = model;
  }

  codeTest = async ({ input, lang, code, output }) => {
    const response = await fetchGlot({ input, lang, code });
    const stdout = this.parseStdout(response.stdout);
    if (response.error !== '') {
      return {
        ...response,
        correct: false,
      };
    }
    return {
      ...response,
      stdout,
      correct: this.isCorrect({ rightAnswer: output, userAnswer: stdout }),
    };
  };

  codeSubmit = async ({ problemId, lang, code }) => {
    const { input_case: inputs, output_case: outputs } = await this.model.getProblem({
      id: problemId,
    });

    const data = await Promise.all(inputs.map((each) => fetchGlot({ input: each, lang, code })));
    const results = data.map((eachResult, idx) => {
      const stdout = this.parseStdout(eachResult.stdout);
      if (eachResult.error !== '') {
        return {
          ...eachResult,
          stdout,
          correct: false,
        };
      }
      return {
        ...eachResult,
        stdout,
        correct: this.isCorrect({ rightAnswer: outputs[idx], userAnswer: stdout }),
      };
    });

    return results;
  };

  get model() {
    return this._model;
  }

  isCorrect = ({ rightAnswer, userAnswer }) => {
    if (typeof rightAnswer !== 'string') {
      return rightAnswer.toString() === userAnswer.toString();
    }
    return rightAnswer === userAnswer.toString();
  };

  parseStdout = (str) => {
    const string = str.trim().replace(/\'/g, '"');
    return JSON.parse(string);
  };
}
