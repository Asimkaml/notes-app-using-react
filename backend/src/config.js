import "dotenv/config";

for (const key of ["DATABASE_URL", "JWT_SECRET", "CLIENT_ORIGIN"]) {
  if (!process.env[key]) {
    console.error(`Missing env var: ${key}`);
    process.exit(1);
  }
}

export const config = {
  port: process.env.PORT || 3000,
  isProd: process.env.NODE_ENV === "production",
  jwtSecret: process.env.JWT_SECRET,
  clientOrigin: process.env.CLIENT_ORIGIN,
};