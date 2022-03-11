// const data = require("../../mock/GameRooms.json");
import { readFile } from "fs/promises";
// import { DB } from "../../init.js";
import DB, { getRows } from "../../db/db.controller.js";

function makeData(row) {
  const { id, title, level, problemType, description, requirement, testcase } =
    row;
  return {
    id,
    level,
    title,
    problemType,
    data: {
      problemDescription: description,
      requirement: requirement,
      testcase,
    },
  };
}

async function ProblemItem(req, res) {
  const problemId = req.params.id;
  const sql = `SELECT 
id as id, 
level as level, 
title as title, 
type as problemType, 
requirement, 
description as description, 
testcase as testcase FROM problem
where id = ${problemId}`;
  const [row] = await getRows(sql);
  console.log(row);
  return res.send(makeData(row));
}

export default ProblemItem;
