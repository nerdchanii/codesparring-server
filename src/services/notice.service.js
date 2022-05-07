export default class NoticeService {
  constructor(model){
    this._model = model;
  }
  
  getNotices(){
    return this.model.getNotices();
  }
 
  createNotice({data}){
    return this.model.createNotice({data});

  }
  getNotice({id}){
    return this._model.getNotice({id});
  }
  removeNotice({id}){
    // if admin user remove notice
    // else can't remove notice
    // 이거를 서비스에서 해야하나? 아니면 컨트롤러에서 해야하나?
    return this._model.removeNotice({id});
  }
  
  updateNotice({id, data}){
    // if admin user update notice
    // else can't update notice
    return this._model.updateNotice({id, data});

  }
  
}