import mysql from 'mysql2/promise';
import 'dotenv/config';

let mysqlconn = null;

export async function mysqlconnFn() {
  if (!mysqlconn) {
    mysqlconn = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
  }

  return mysqlconn;
}
