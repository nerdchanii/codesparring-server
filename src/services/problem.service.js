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
    const { testcase, verifycase } = problemSet;
    const testInput = testcase.map(({ input }) => input);
    const testOutput = testcase.map(({ output }) => output);
    const verifycaseInput = verifycase.map(({ input }) => input);
    const verifycaseOutput = verifycase.map(({ output }) => output);

    const problem = {
      ...problemSet, type: problemSet.problemType, input: [...testInput, ...verifycaseInput], output: [...testOutput, ...verifycaseOutput], testInput, testOutput
    };
    return await this.model.createProblem(problem);
  };

  getProblem = async ({ id, whole }) => {
    return await this.model.getProblem({ id, whole });
  };

  updateProblem = async (data) => {
    return await this.model.updateProblem({ id: data.id, data: data });
  };

  getRandomProblem = async () => {
    return await this.model.getRandomProblem();
  }

}
