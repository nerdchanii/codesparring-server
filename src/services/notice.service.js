import NoticeModel from '../model/notice.model';

export default class NoticeService {
  /**
   * @param {NoticeModel} model
   */
  constructor(model) {
    this._model = model;
  }
  /**
   * @returns {NoticeModel}
   */
  get model() {
    return this._model;
  }

  getNotices = async () => {
    return await this.model.getNotices();
  };

  createNotice = async ({ title, label, contents }) => {
    return await this.model.createNotice({ title, label, contents });
  };

  getNotice = async ({ id }) => {
    return await this.model.getNotice({ id });
  };

  removeNotice = async ({ id }) => {
    // if admin user remove notice
    // else can't remove notice
    // 이거를 서비스에서 해야하나? 아니면 컨트롤러에서 해야하나?
    return await this.model.removeNotice({ id });
  };

  updateNotice = async ({ id, title, label, contents }) => {
    return await this.model.updateNotice({ id, title, label, contents });
  };
}
