import {
  pgTable,
  text,
  uuid,
  doublePrecision,
  integer,
} from "drizzle-orm/pg-core";
import { users } from "../user";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  name: text("name"),
  description: text("description"),
  price: doublePrecision("price"),
  rating: doublePrecision("rating"),
  total_ratings: integer("total_ratings").default(0),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
});
