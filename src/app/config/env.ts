import 'dotenv/config';

export const env = {
  port: process.env.PORT || 3005,
  jwtSecret: process.env.JWT_SECRET || '',
  databaseUrl: process.env.DATABASE_URL || '',
};
