import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const characters = sqliteTable("characters", {
    id: text("id", { length: 36 }).primaryKey().$defaultFn(crypto.randomUUID.bind(crypto)),
    name: text("name").notNull(),
    class: text("class", { enum: ["warrior", "wizard", "bard", "cleric", "thief"] }).notNull(),
    bio: text("bio"),
    strength: integer("strength").notNull(),
    dexterity: integer("dexterity").notNull(),
    agility: integer("agility").notNull(),
    intelligence: integer("intelligence").notNull(),
    charisma: integer("charisma").notNull()
});
