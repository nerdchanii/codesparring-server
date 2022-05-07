// import dotenv from "dotenv";
import mysql from "mysql2";

// dotenv.config();

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
};
console.log(process.env.DB_DATABASE)
const pool = mysql.createPool({
  ...config});

export default pool;


