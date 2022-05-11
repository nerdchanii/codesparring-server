export default class User {
  constructor() {}

  getUser({ nickname }) {
    return ['SELECT nickname, points FROM users WHERE nickname = ?', [nickname]];
  }

  getUsers() {
    return ['SELECT user_id as userId, nickname, points, email FROM users'];
  }

  getRanks() {
    return ['SELECT user_id as userId, nickname, points, email FROM users ORDER BY points DESC'];
  }

  createUser({ nickname, email, salt, password }) {
    return [
      'INSERT INTO users (nickname, email, salt, password) VALUES (?, ?, ?, ?)',
      [nickname, email, salt, password],
    ];
  }

  removeUser({ userId }) {
    return ['DELETE FROM users WHERE user_id = ?', [userId]];
  }

  // 이미 등록된 이메일인지 확인
  isExistEmail({ email }) {
    return ['SELECT email FROM users WHERE email = ?', [email]];
  }

  isExistNickname({ nickname }) {
    return ['SELECT nickname FROM users WHERE nickname = ?', [nickname]];
  }
}
