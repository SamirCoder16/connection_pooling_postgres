import "dotenv/config";
import express from "express";
import morgan from "morgan";
import pg from "pg";
import { pool } from "./db.js";

// pg client
const { Client } = pg;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// route for without pool connection .
/**
 * 1. Without-poolconnection
 * har request par new postgres sql client create hota hie.
 */
app.get("/without-pool", async (req, res) => {
  const client = new Client({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

  const start = Date.now();

  try {
    await client.connect();

    const result = await client.query("SELECT * FROM users ORDER BY id");
    res.json({
      route: "/without-pool",
      message: "New connection created for this request",
      durationMs: Date.now() - start,
      users: result.rows,
    });
  } catch (e) {
    console.error("Without pool error:", error.message);

    res.status(500).json({
      error: "Database error",
    });
  } finally {
    await client.end(); // we have to close manually the connection because we are not using a pool. we use connect().
  }
});

/**
 * 2.With-pool connection
 * sgared pool se connection aquire hota hai
 */
app.get("/with-pool", async (req, res) => {
  const start = Date.now();

  try {
    const result = await pool.query("SELECT * FROM users ORDER BY id");
    res.json({
      route: "/pool",
      message: "Shared connection pool used",
      durationMs: Date.now() - start,
      users: result.rows,
    });
  } catch (e) {
    console.error("Pool error:", error.message);

    res.status(500).json({
      error: "Database error",
    });
  }
});

/**
 * pool monitoring
 * 1. pool.totalCount: total number of clients in the pool
 * 2. pool.idleCount: number of clients which are not checked out but are idle in the pool
 */

app.get("/pool-stats", (req, res) => {
  res.json({
    totalCount: pool.totalCount,
    idleCount: pool.idleCount,
    waitingCount: pool.waitingCount,
  });
});

export default app;
