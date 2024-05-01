import { readFile } from "node:fs/promises";
import { db } from "./src/server/db/instance.ts";
import { sql } from "drizzle-orm";

async function run() {
    const script = await readFile("./src/server/db/characters.sql", "utf-8");

    await db.run(sql.raw(script));
}

run();
