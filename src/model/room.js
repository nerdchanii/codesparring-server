import { uuid } from 'uuidv4';

export default class Room {
  constructor({ roomNumber, name }) {
    this.name = name || `room: ${roomNumber}`;
    this._id = uuid();
    this._userList = [];
    this._roomNumber = roomNumber;
    /** @type {'playing'| 'waiting' | null} _status */
    this._status = 'waiting';
    this._problem = null;

  }

  get userList() {
    return this._userList;
  }

  addUser = ({ user }) => {
    this._userList.push(user);
  };

  removeUser = ({ user }) => {
    this._userList = this._userList.filter((username) => username !== user);
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
      name: this.name,
      roomNumber: this._roomNumber,
      status: this._status,
      problem: this._problem,

    };
  }
  get problem() {
    return this._problem;
  }

  get status() {
    return this._status;
  }

  setProblem = ({ problem }) => {
    this._problem = problem;
  }

  get problem() {
    return this._problem;
  }

  gameStart = ({ problem }) => {
    this._problem = problem;
    this._status = 'playing';
  }
}
