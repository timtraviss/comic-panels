import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

loadEnvConfig(process.cwd());

// Supabase session-mode pooler (port 5432) supports DDL; direct host unreachable from this network.
// Derive from DATABASE_URL: swap port 6543→5432, strip ?pgbouncer=true.
function sessionModeUrl(): string {
  const raw = process.env["DATABASE_URL"] ?? "";
  return raw.replace(":6543/", ":5432/").replace("?pgbouncer=true", "");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: { path: "prisma/migrations" },
  datasource: { url: sessionModeUrl() },
});
