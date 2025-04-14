export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  database: process.env.DATABASE_URL,
  jwt: {
    accessToken: process.env.JWT_ACCESS_SECRET,
    accessExpires: process.env.JWT_ACCESS_EXPIRES,
    refreshToken: process.env.JWT_REFRESH_SECRET,
    refreshExpires: process.env.JWT_REFRESH_EXPIRES,
  }
});