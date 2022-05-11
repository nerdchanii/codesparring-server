export default class ProblemService {
  constructor(model) {
    this._model = model;
  }

  get model() {
    return this._model;
  }

  getProblems = async () => {
    return await this.model.getProblems();
  };

  createProblem = async (problemSet) => {
    return await this.model.createProblem(problemSet);
  };

  getProblem = async ({ id }) => {
    return await this.model.getProblem({ id });
  };

  updateProblem = async (data) => {
    return await this.model.updateProblem({ id: data.id, data: data });
  };
}
