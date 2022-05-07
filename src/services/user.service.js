export default class UserService {
  constructor(model){
    this._model = model;
  }
  get model(){
    return this._model;
  }

  getUser({id}){
    return this.model.getUser({id});
  }

  getUsers(){
    return this.model.getUsers();
  }

  createUser({nickname, email, password}){
    if(!this.isExistEmail({email}) && !this.isExistNickname({nickname})){
      return this.model.createUser({nickname, email, password});
    } else{
      // Error 처리
    }
  }

  removeUser({id}){
    return this.model.removeUser({id});
  }

  // 이미 등록된 이메일인지 확인
  isExistEmail({email}){
    return this.model.isExistEmail({email});
  }
  // 이미 등록된 닉네임인지 확인
  isExistNickname({nickname}){
    return this.model.isExistNickname({nickname});
  }

  
}