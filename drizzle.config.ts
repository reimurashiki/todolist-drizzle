import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_DXdiE4tAO5Tb@ep-icy-frost-a1ijcuf8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  }
});