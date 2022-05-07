import { HTTP_CODE } from "../../../constants/http.constants";


export default class CodeController {
  constructor(service) {
      this._service = service;
  }

  get service(){
    this._service;
  }

  async codeTest(req, res){
    const { stdin : input, lang, code, output } = req.body;
    const result = await this.service.codeTest({ input, lang, code, output});
  
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  }
  
  async codeSubmit(req, res){
  
    const { problemId, lang, code } = req.body;
    const result = await this.service.codeSubmit({ problemId, lang, code});
    res.json({
      code: HTTP_CODE.OK,
      result: result,
    });
  }
}



