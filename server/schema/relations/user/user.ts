import { relations } from "drizzle-orm";
import { favorites, products, users } from "../../models";

export const usersRelations = relations(users, ({ many }) => ({
  favorites: many(favorites),
  products: many(products),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  product: one(products, {
    fields: [favorites.product_id],
    references: [products.id],
  }),
  user: one(users, {
    fields: [favorites.user_id],
    references: [users.id],
  }),
}));
