import { drizzle } from "drizzle-orm/neon-serverless";
import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { Pool } from "@neondatabase/serverless";

const pool = new Pool({ 
  connectionString: "postgresql://neondb_owner:npg_DXdiE4tAO5Tb@ep-icy-frost-a1ijcuf8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require" 
});

const db = drizzle(pool);

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed");
    await pool.end();
  } catch (error) {
    console.error("Error performing migration:", error);
    await pool.end();
    process.exit(1);
  }
}

main();