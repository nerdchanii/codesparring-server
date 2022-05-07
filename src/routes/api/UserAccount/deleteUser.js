// const data = require("../../mock/GameRooms.json");

import { readFile } from "fs/promises";
import { deleteRow } from "../../db/db.controller.js";
import { varifyAccessToken } from "../../middleware/jwt/jwt.js";

async function deleteUser(req, res) {
  const token = req.headers.authorization;
  if (token === "null") {
    return res.sendStatus(401);
  }
  // 토큰 확인
  try {
    const userInfo = varifyAccessToken(token);
    const sql = `DELETE FROM user WHERE user_naver_id = '${userInfo.id}'`;
    const result = await deleteRow(sql);
    return res.status(200).json({ result: result });
  } catch (e) {
    switch (e.name) {
      case "TokenExpiredError":
        console.log("token expired");
        return res.status(401).send({ result: "TokenExpiredError" });
      default:
        console.log("userdelete", e.name);
        return res.status(500).sned({ result: "server Error" });
    }
  }
}

export default deleteUser;
