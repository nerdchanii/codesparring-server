export default class User {
  constructor() { }

  getUser({ username }) {
    return ['SELECT username, points FROM users WHERE username = ?', [username]];
  }

  getUsers() {
    return ['SELECT user_id as userId, username, points, email FROM users'];
  }

  getRanks() {
    return ['SELECT user_id as userId, username, points, email FROM users ORDER BY points DESC'];
  }

  createUser({ username, email, salt, password }) {
    return [
      'INSERT INTO users (username, email, salt, password) VALUES (?, ?, ?, ?)',
      [username, email, salt, password],
    ];
  }

  removeUser({ userId }) {
    return ['DELETE FROM users WHERE user_id = ?', [userId]];
  }

  // 이미 등록된 이메일인지 확인
  isExistEmail({ email }) {
    return ['SELECT email FROM users WHERE email = ?', [email]];
  }

  isExistUsername({ username }) {
    return ['SELECT username FROM users WHERE username = ?', [username]];
  }

  // point UP
  updatePoints({ username, point }) {
    return ['UPDATE users SET points = points + ? WHERE username = ?', [point, username]];
  }


}
