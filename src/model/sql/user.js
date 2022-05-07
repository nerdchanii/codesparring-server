export default class User{
  constructor(){

  }
  
  getUser({id}){
    return ('SELECT * FROM users WHERE username = ?', [id]);
  }

  getUsers(){
    return ('SELECT * FROM users');
  }

  createUser({name, email, password}){
    return ('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
  }

  removeUser({id}){
    return ('DELETE FROM users WHERE username = ?', [id]);
  }

  // 이미 등록된 이메일인지 확인
  isExistEmail({email}){
    return ('SELECT * FROM users WHERE email = ?', [email]);
  }

  isExistNickname({nickname}){
    return ('SELECT * FROM users WHERE nickname = ?', [nickname]);
  }

}