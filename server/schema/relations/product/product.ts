import { relations } from "drizzle-orm";
import { favorites, products, users } from "../../models";

export const productRelations = relations(products, ({ many, one }) => ({
  favorites: many(favorites),
  users: one(users, {
    fields: [products.user_id],
    references: [users.id],
  }),
}));
