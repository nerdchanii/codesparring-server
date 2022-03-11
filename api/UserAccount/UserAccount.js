// const data = require("../../mock/GameRooms.json");

import { readFile } from "fs/promises";

//이 스크립트는 getUserAccount로 대체되어야합니다.
async function UserAccount(req, res) {
  const query = req.query;
  const data = JSON.parse(
    await readFile(new URL("../../mock/nerdchanii.json", import.meta.url))
  );
  res.json(JSON.stringify(data));
  // res.json(req.query);
}

export default UserAccount;
