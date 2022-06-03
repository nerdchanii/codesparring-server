import { HTTP_CODE } from '../../../constants/http.constants';

export default class CodeController {
  constructor({ service }) {
    this._service = service;
  }

  get service() {
    return this._service;
  }

  codeTest = async (req, res, next) => {
    const { input, lang, code, output } = req.body;
    try {
      const result = await this.service.codeTest({ input, lang, code, output });
      res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    } catch (e) {
      next(e);
    }


  };

  codeSubmit = async (req, res, next) => {
    const { problemId, lang, code } = req.body;
    try {
      const result = await this.service.codeSubmit({ problemId, lang, code });
      res.json({
        code: HTTP_CODE.OK,
        result: result,
      });
    } catch (e) {
      next(e);
    }

  };
}
