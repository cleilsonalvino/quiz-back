import 'dotenv/config';
import { defineConfig, env } from '@prisma/client';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    db: {
      provider: 'postgresql',
      url: env('DATABASE_URL'),
    },
  },
});
