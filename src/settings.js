require('dotenv').config();
module.exports= {
    'port': process.env.PORT || 4000,
    'origin': [
      '*'
    ],
    'useHTTP2': false,
    'SMTP_HOST': '',
    'SMTP_PORT': '',
    'SMTP_USER': '',
    'SMTP_PASSWORD': '',
    'EMAIL_NAME': '',
    'EMAIL_FROM': 'from@example.com',
    'MONGODB_URL': 'mongodb+srv://firebase2420:th4LP39FdjC3Bd6Y@cluster0.leymei6.mongodb.net/PROJECT_SCHOOL',
    "ENCRYPTION_SECRET":'SHAZZADHOSSEN!@#$%^&*()'
  };