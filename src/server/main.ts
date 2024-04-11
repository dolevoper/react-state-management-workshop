import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database("sqlite.db");
const db = drizzle(sqlite);

const app = express();

app.use(bodyParser.json());

app.post("/characters", (req, res) => {
  console.log(req.body);

  res.status(201);
  res.end();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
