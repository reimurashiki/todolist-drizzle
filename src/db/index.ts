import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_DXdiE4tAO5Tb@ep-icy-frost-a1ijcuf8-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
});

export const db = drizzle(pool, { schema });