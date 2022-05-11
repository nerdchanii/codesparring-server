import { HTTP_CODE } from '../../../constants/http.constants';

export default class NoticeController {
  constructor({ service }) {
    this._service = service;
  }

  get service() {
    return this._service;
  }

  getNotices = async (req, res) => {
    const notices = await this.service.getNotices();
    res.json({
      code: HTTP_CODE.OK,
      result: {
        notices,
      },
    });
  };

  createNotice = async (req, res) => {
    const { title, label, contents } = req.body;
    const result = await this.service.createNotice({ title, label, contents });
    res.json({
      code: HTTP_CODE.OK,
      result,
    });
  };

  getNotice = async (req, res) => {
    const { id } = req.params;
    const notice = await this.service.getNotice({ id });
    res.json({
      code: HTTP_CODE.OK,
      result: {
        notice,
      },
    });
  };
  Z;

  removeNotice = async (req, res) => {
    const { id } = req.params;
    const result = await this.service.removeNotice({ id });
    res.json({
      code: HTTP_CODE.OK,
      result,
    });
  };

  updateNotice = async (req, res) => {
    // TODO
    // 이거 어드민 핸들러 타고가게 해야함
    const { id } = req.params;
    const { title, label, contents } = req.body;
    const result = await this.service.updateNotice({ id, title, label, contents });
    res.json({
      code: HTTP_CODE.OK,
      result,
    });
  };
}
