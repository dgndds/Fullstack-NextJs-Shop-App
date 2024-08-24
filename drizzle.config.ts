import type { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./server/schema/index.ts",
  out: "./server/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
