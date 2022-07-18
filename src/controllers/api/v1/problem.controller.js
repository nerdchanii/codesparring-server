import { HTTP_CODE } from '../../../constants/http.constants';

export default class ProblemController {
  constructor({ service }) {
    this._service = service;
  }
  get service() {
    return this._service;
  }
  getProblems = async (req, res, next) => {
    try {
      const problems = await this.service.getProblems();
      res.json({
        code: HTTP_CODE.OK,
        result: {
          problems,
        },
      });
    } catch (e) {
      next(e);
    }
  };

  createProblem = async (req, res, next) => {
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      req.body;
    try {
      const result = await this.service.createProblem({
        title,
        type,
        level,
        test_input,
        test_output,
        input,
        output,
        requirement,
        description,
      });
      res.json({
        code: HTTP_CODE.OK,
        result: {
          result,
        },
      });
    } catch (e) {
      next(e);
    }

  };

  getProblem = async (req, res, next) => {
    const { id } = req.params;
    try {
      const problem = await this.service.getProblem({ id });
      res.json({
        code: HTTP_CODE.OK,
        result: {
          problem,
        },
      });
    } catch (e) {
      next(e);
    }

  };

  updateProblem = async (req, res, next) => {
    const { id } = req.params;
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      req.body;
    try {
      const result = await this.service.updateProblem({
        id,
        title,
        type,
        level,
        test_input,
        test_output,
        input,
        output,
        requirement,
        description,
      });
      res.json({
        code: HTTP_CODE.OK,
        result,
      });
    } catch (e) {
      next(e);
    }
  };
}
