export default class NoticeController {
  constructor(service) {
    this._service = service;
  }
  
  get service() {
    return this._service;
  }

  getNotices = function(req, res) {
    this.service.getNotices();
    res.json({});
  }

  createNotice = function(req, res) {
    const { data } = req.body;
    this.service.createNotice({data});
    res.json({});
  }

  getNotice = function(req, res) {
    const { noticeId } = req.body; 
    this.service.getNotice({id: noticeId});
    res.json({});
  }

  removeNotice = function(req, res) {
    const { noticeId } = req.body; 
    this.service.removeNotice({id: noticeId});
    res.json({});
  }

  

  updateNotice = function(req, res) {
    const { noticeId, data } = req.body; 
    this.service.updateNotice({id: noticeId, data});
    res.json({});
    
  }




   
}