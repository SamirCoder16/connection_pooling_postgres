import http from "node:http";
import app from "./app.js";
import { pool } from "./db.js";

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// This code snippet is for graceful shutdown of the server and closing the database pool when the application is terminated.
process.on("SIGTERM", async () => {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
});
