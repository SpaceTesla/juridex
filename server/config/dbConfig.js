import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error(`[Database] Connection Error: ${err.stack}`);
    return;
  }
  console.log(`[Database] Connected → ID: ${connection.threadId}`);
});

export default connection;
