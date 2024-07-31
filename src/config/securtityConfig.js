const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');

// Load environment variables from .env file
require('dotenv').config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Access-Control-Allow-Origin', 'Authorization', 'Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Whitelisted URLs
const whitelistedURLs = [
  '/', '/index.html', 'static/**', '/asset-manifest.json',
  '/favicon.ico', '/loader.gif', '/manifest.json', '/robots.txt',
  '/platform-datavidhya/', '/login/callback', '/dashboard', '/create-question', '/view-question', '/solve-question/**', '/api/user/question/**', '/api/code/**'
];

// Serve Static Files
app.use('/static', express.static(path.join(__dirname, '../../public/static')));
app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, '../../public/favicon.ico')));

// Middleware to check if the URL is whitelisted
app.use((req, res, next) => {
  if (whitelistedURLs.includes(req.path) || req.path.startsWith('/static') || req.path.startsWith('/solve-question')) {
    return next();
  } else if (req.path.startsWith('/api')) {
    return authenticateJWT(req, res, next);
  } else {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  }
});

module.exports = app;
