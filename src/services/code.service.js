import { fetchGlot } from "../utils/glot"


export default class CodeService{
  constructor(model){
    this._model = model;
  }

  async codeTest({input, lang, code, output}) {
    const data = await fetchGlot({ input, lang, code });
    if (data.stderr == "" && data.stdout?.trim() == output?.trim()) {
      return {
        result: "success",
        stdout,
      };
    } else {
      return {
        result: "fail",
        stdout: data.stdout,
        stderr: data.stderr,
      }
    }
  }
  
  async codeSubmit({problemId, lang, code}) {
    // const problem = await this.model.problem.findById(problemId);
    const data = await fetchGlot({ problemId, lang, code });
  
  }
  
  get model(){
    return this._model;
  }
  
}