import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import type { Pool } from 'mysql2/promise';

dotenv.config();

const requiredEnvironmentVariables = [
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_NAME',
] as const;

for (const variableName of requiredEnvironmentVariables) {
  if (!process.env[variableName]) {
    throw new Error(`Missing required environment variable: ${variableName}`);
  }
}

export const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const checkDatabaseConnection = async (): Promise<void> => {
  const connection = await pool.getConnection();

  try {
    await connection.ping();
  } finally {
    connection.release();
  }
};
