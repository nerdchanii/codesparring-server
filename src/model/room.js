import { uuid } from 'uuidv4';

export default class Room {
  constructor({ user, roomNumber }) {
    this._id = uuid();
    this._userList = [];
    this._roomNumber = this.addUser({ user });
  }

  get userList() {
    return this._userList;
  }

  addUser = ({ user }) => {
    this._userList.push(user);
  };

  removeUser = ({ user }) => {
    this._userList = this._userList.filter((nickname) => nickname !== user);
  };

  isEmpty = () => {
    return this._userList.length === 0;
  };

  hasUser = ({ user }) => {
    return this._userList.includes(user);
  };

  get id() {
    return this._id;
  }

  get info() {
    return {
      id: this._id,
      users: this._userList,
    };
  }
}
