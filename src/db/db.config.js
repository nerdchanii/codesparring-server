import dotenv from "dotenv";
dotenv.config("./env");

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectionLimit: 10,
  database: process.env.DB_DATABASE,
};

export default dbconfig;
