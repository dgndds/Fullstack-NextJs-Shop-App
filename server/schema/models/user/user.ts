import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "../product";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().notNull(),
  name: text("name"),
  role: text("role"),
  created_at: timestamp("created_at").defaultNow(),
});

export const favorites = pgTable("favorites", {
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  created_at: timestamp("created_at").defaultNow(),
});
