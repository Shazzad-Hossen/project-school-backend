Here's the updated README to match your setup:  

---

# Ma Training MATC Backend

Project School Backend is a Node.js API built with Express.js and MongoDB. This backend serves as the core API for the **Ma Training MATC** frontend project.

## Features

- User authentication with JWT  
- CORS support for multiple origins  
- MongoDB database with Mongoose  
- Secure configuration using `settings.js`  
- Email service integration (SMTP)  
- Logging with `morgan`  

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS version recommended)  
- [MongoDB](https://www.mongodb.com/) (if running locally)  
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)  

## Getting Started

### Clone the Repository

```sh
git clone https://github.com/Shazzad-Hossen/project-school-backend.git
cd project-school-backend
```

### Install Dependencies

```sh
npm install
# or
yarn install
```

### Configure Settings  

Instead of using `.env`, all configurations are stored in `settings.js`.  

Open `settings.js` and update the required fields:  

```js
module.exports = {
    port: process.env.PORT || 4000,
    origin: [
      '*',
      'http://localhost:5173',
      'https://maa-training.web.app',
      'https://maa-training.firebaseapp.com'
    ],
    useHTTP2: false,
    SMTP_HOST: '',
    SMTP_PORT: '',
    SMTP_USER: '',
    SMTP_PASSWORD: '',
    EMAIL_NAME: '',
    EMAIL_FROM: 'from@example.com',
    MONGODB_URL: 'your_mongodb_connection_string',
    COOKIE_NAME: 'PROJECT_SCHOOL',
};
```

Replace `'your_mongodb_connection_string'` with your actual MongoDB URL.

### Run the Server Locally

```sh
npm run dev
# or
yarn dev
```

By default, the server runs on `http://localhost:4000/`.

## Running in Production

To start the backend in a production environment:

```sh
npm start
# or
yarn start
```

## Deployment

You can deploy this backend on:

- [Render](https://render.com/)  
- [Vercel](https://vercel.com/)  
- [Heroku](https://www.heroku.com/)  
- [DigitalOcean](https://www.digitalocean.com/)  
- [AWS](https://aws.amazon.com/)  

## API Base URL

```
https://project-school-backend.onrender.com/api
```

## CORS Configuration

The backend supports the following origins:

- `http://localhost:5173`
- `https://maa-training.web.app`
- `https://maa-training.firebaseapp.com`

Modify `origin` in `settings.js` if you need to allow additional domains.

## Author

**Shazzad Hoissen**  
GitHub: [shazzad-hossen](https://github.com/shazzad-hossen)

---

Let me know if you need any changes! 🚀