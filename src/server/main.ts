import express from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { like } from "drizzle-orm";
import { db } from "./db/instance.ts";
import { characters } from "./db/schema.ts";

const app = express();

app.use(bodyParser.json());

app.get("/characters", async (req, res) => {
  const nameSearch = req.query.name?.toString();
  const data = await db.select().from(characters).where(nameSearch ? like(characters.name, `%${nameSearch}%`) : undefined);

  res.status(200);
  res.json(data);
});

app.post("/characters", async (req, res) => {
  await db.insert(characters).values(req.body);

  res.status(201);
  res.end();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
