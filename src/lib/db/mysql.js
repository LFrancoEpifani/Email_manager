import mysql from 'mysql2/promise';

let mysqlconn = null;

export async function mysqlconnFn() {
  if (!mysqlconn) {
    mysqlconn = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'mailparser',
    });
  }

  return mysqlconn;
}
