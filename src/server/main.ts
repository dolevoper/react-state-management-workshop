import express, { Request } from "express";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import { like } from "drizzle-orm";
import { db } from "./db/instance.ts";
import { characters } from "./db/schema.ts";

const app = express();

app.use(bodyParser.json());

const pageSize = 10;

app.get("/characters", async (req, res) => {
  const page = getPageNumber(req);
  const nameSearch = req.query.name?.toString();
  const data = await db
    .select()
    .from(characters)
    .where(nameSearch ? like(characters.name, `%${nameSearch}%`) : undefined)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  res.status(200);
  res.json(data);
});

function getPageNumber(req: Request) {
  const maybePage = Number(req.query.page);

  return isNaN(maybePage) ? 1 : maybePage;
}

app.post("/characters", async (req, res) => {
  await db.insert(characters).values(req.body);

  res.status(201);
  res.end();
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
