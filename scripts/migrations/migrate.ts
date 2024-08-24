import postgres from "postgres";
import drizzleConfig from "../../drizzle.config";
import { db } from "../../server/drizzle-client/drizzle-client";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

console.log("[migrate.ts] Running migrations...");
const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });

migrate(drizzle(migrationClient), { migrationsFolder: drizzleConfig.out! })
  .then(() => {
    console.log("[migrate.ts] Migrations complete");
  })
  .catch((err) => {
    console.log("[migrate.ts] ERROR running migrations:");
    console.error(err);
  })
  .finally(() => {
    process.exit();
  });
