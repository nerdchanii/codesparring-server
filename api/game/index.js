import { Room, RoomList } from "./room.class.js";
import { uuid } from "uuidv4";
const roomList = new RoomList();

for (let i = 0; i < 10; i++) {
  const room = new Room(`${i}번째방`, roomList.nextRoomNumber());
  roomList.addRoom(room);
}

export default roomList;
