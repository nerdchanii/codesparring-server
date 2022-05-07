//jwt 
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt';

export default class Jwt{ 
  constructor(){  

  }
  createToken({nickname, email}){
    const token = jwt.sign({ nickname, email }, JWT_SECRET)
    }

}