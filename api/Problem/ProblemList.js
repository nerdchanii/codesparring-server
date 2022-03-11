// const data = require("../../mock/GameRooms.json");
import { readFile } from "fs/promises";
import { getRows } from "../../db/db.controller.js";
const sql = `SELECT id,level,title,type as problemType ,is_stable as good,not_stable as bad, vote_count as total FROM problem`;

async function ProbelmList(req, res) {
  const rows = await getRows(sql);
  console.log(rows);
  return res.json(rows);
}

export default ProbelmList;
