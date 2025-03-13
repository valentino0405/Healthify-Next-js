import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_7YsXREacW1om@ep-cold-pine-a8dczwwm-pooler.eastus2.azure.neon.tech/neondb?sslmode=require',
  }
});
