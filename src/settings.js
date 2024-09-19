require('dotenv').config();
module.exports= {
    'port': process.env.PORT || 4000,
    'origin': [
      '*',
      'http://localhost:5173',
      'https://project-school-srv.netlify.app'
    ],
    'useHTTP2': false,
    'SMTP_HOST': '',
    'SMTP_PORT': '',
    'SMTP_USER': '',
    'SMTP_PASSWORD': '',
    'EMAIL_NAME': '',
    'EMAIL_FROM': 'from@example.com',
    'MONGODB_URL': 'mongodb+srv://firebase2420:th4LP39FdjC3Bd6Y@cluster0.leymei6.mongodb.net/PROJECT_SCHOOL',
    "SECRET":'d163877362df46ea47aa37b971bca7175508bf049784e370032d109f0bd2c55e:412a859df076fe70393408d340d649a3',
    "COOKIE_NAME":"PROJECT_SCHOOL",
  };