export default class Notice {
  constructor() {}

  getNotice = ({ id }) => {
    return ['SELECT * FROM notice WHERE id = ?', [id]];
  };

  getNotices = () => {
    return ['SELECT * FROM notice'];
  };

  createNotice = ({ title, label, contents }) => {
    return [
      'INSERT INTO notice (title, label, contents) VALUES (?, ?, ?)',
      [title, label, contents],
    ];
  };

  updateNotice = ({ id, title, contents, label }) => {
    return [
      'UPDATE notice SET title = ?, contents = ?, label = ? WHERE id = ?',
      [title, contents, [label], id],
    ];
  };
  removeNotice = ({ id }) => {
    return ['DELETE FROM notice WHERE id = ?', [id]];
  };
}
