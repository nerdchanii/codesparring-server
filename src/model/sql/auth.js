export default class Auth {
  constructor() {}

  getUser({ email }) {
    return ['SELECT * FROM users WHERE email = ?', [email]];
  }
}
