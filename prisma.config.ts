import { loadEnvConfig } from "@next/env";
import { defineConfig } from "prisma/config";

// Load .env.local (Next.js convention) so Prisma CLI picks up DATABASE_URL and DIRECT_URL
const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
  },
});
