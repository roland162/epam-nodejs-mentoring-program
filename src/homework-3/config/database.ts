import { Pool } from 'pg';
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Successfully connected to the database');
});

export const dataBaseQuery = (text, params) => pool.query(text, params);