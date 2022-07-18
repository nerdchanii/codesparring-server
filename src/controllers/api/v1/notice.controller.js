import { HTTP_CODE } from '../../../constants/http.constants';

export default class NoticeController {
  constructor({ service }) {
    this._service = service;
  }

  get service() {
    return this._service;
  }

  getNotices = async (req, res, next) => {
    try {
      const notices = await this.service.getNotices();
      res.json({
        code: HTTP_CODE.OK,
        result: {
          notices,
        },
      });
    } catch (e) {
      next(e);
    }

  };

  createNotice = async (req, res, next) => {
    const { title, label, contents } = req.body;
    try {
      const result = await this.service.createNotice({ title, label, contents });
      res.json({
        code: HTTP_CODE.OK,
        result,
      });
    } catch (e) {
      next(e);
    }
  };

  getNotice = async (req, res, next) => {
    const { id } = req.params;
    try {
      const notice = await this.service.getNotice({ id });
      res.json({
        code: HTTP_CODE.OK,
        result: {
          notice,
        },
      });
    } catch (e) {
      next(e);
    }
  };
  Z;

  removeNotice = async (req, res, next) => {
    const { id } = req.params;
    try {
      const result = await this.service.removeNotice({ id });
      res.json({
        code: HTTP_CODE.OK,
        result,
      });
    } catch (e) {
      next(e);
    }

  };

  updateNotice = async (req, res, next) => {
    // TODO
    // 이거 어드민 핸들러 타고가게 해야함
    const { id } = req.params;
    const { title, label, contents } = req.body;
    try {
      const result = await this.service.updateNotice({ id, title, label, contents });
      res.json({
        code: HTTP_CODE.OK,
        result,
      });
    } catch (e) {
      next(e);
    }
  };
}
