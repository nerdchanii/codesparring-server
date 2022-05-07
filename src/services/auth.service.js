import Jwt from '../utils/jwt.js';

export default class AuthService {
  constructor(model){
    this._model = model;
    this._jwt = new Jwt();
  }

  get jwt(){
    return this._jwt;
  }

  createToken({email, password}) {
    const [user] = this._model.getUser({email});
    if(user && user.password === password){
      const {userId, nickname, email} = user;
      const token = this.jwt.createToken({nickname, email});
      return {
        userId,
        profile:{
          nickname,
          email
        },
        token
      }
    }

    // return{
    //   userId : 1,
    //   profile: {
    //     name:'nerdchanii'
    //   },
    //   token: "JSON_WEB_TOKEN",
    // }
  };

}



