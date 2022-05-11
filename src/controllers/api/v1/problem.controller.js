import { HTTP_CODE } from '../../../constants/http.constants';

export default class ProblemController {
  constructor({ service }) {
    this._service = service;
  }
  get service() {
    return this._service;
  }
  getProblems = async (req, res) => {
    const problems = await this.service.getProblems();
    res.json({
      code: HTTP_CODE.OK,
      result: {
        problems,
      },
    });
  };

  createProblem = async (req, res) => {
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      req.body;
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
  };

  getProblem = async (req, res) => {
    const { id } = req.params;
    const problem = await this.service.getProblem({ id });
    res.json({
      code: HTTP_CODE.OK,
      result: {
        problem,
      },
    });
  };

  updateProblem = async (req, res) => {
    const { id } = req.params;
    const { title, type, level, test_input, test_output, input, output, requirement, description } =
      req.body;
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
  };
}
