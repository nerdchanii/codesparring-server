// const data = require("../../mock/GameRooms.json");
import { readFile } from "fs/promises";
import { getRows } from "../../db/db.controller.js";

const sql =
  "SELECT rank() over(order by user_whole_point desc) as id , user_nickname as nickName, user_whole_point as point from user";

async function RankList(req, res) {
  const rows = await getRows(sql);
  return res.send(rows);
}

export default RankList;
