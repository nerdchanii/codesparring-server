export default class Auth{
  constructor(){

  }
  
  checkUser({email}){
    return ('SELECT * FROM users WHERE email = ?', [email]);
  }


}