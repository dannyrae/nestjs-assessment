export const APP_NAME = 'grocery-api';
export const configuration = () => ({
  port: parseInt(process.env.PORT || '3004'),
  db: {
    uri: process.env.MONGO_URI || '',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'insecure',
    issuer: APP_NAME,
    expiresIn: '7d',
  }
});
