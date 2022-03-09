import mysql from "mysql2"; // mysql 사용
import dbconfig from "./db.config.js";
import DBconfing from "./db.config.js"; // db 설정

const DB = mysql.createPool({
  ...DBconfing,
  database: "codesparring",
});

const pool = DB.promise();

export async function getRows(sql) {
  try {
    const [rows, fields] = await pool.query(sql);
    return rows;
  } catch (e) {
    console.log(e);
  }
}

export async function insertRows(sql) {
  try {
    const Result = await pool.query(sql);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export default pool;
