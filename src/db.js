import "dotenv/config";
import pg from "pg";

const { Pool } = pg;

const host = process.env.PGHOST;
const port = process.env.PGPORT;
const pgDatabase = process.env.PGDATABASE;
const pgPassword = process.env.PGPASSWORD;
const pgUser = process.env.PGUSER;

export const pool = new Pool({
  host: host,
  port: port,
  database: pgDatabase,
  user: pgUser,
  password: pgPassword,

  max: 10, // This means that inside a pool there can be a maximum of 10 connections at a time.
  // If all 10 connections are busy, the next request will wait until one of the connections is released back to the pool.
  idleTimeoutMillis: 30_000, // This means that if a connection is idle (not being used) for 30 seconds, it will be closed and removed from the pool.
  connectionTimeoutMillis: 2_000, // This means that if a connection cannot be established within 2 seconds, an error will be thrown.
});
