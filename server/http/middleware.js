const path = require('path');
const express = require('express');

const DIST_PATH = path.join(__dirname, '../../dist');
const PUBLIC_PATH = path.join(__dirname, '../../public');

// Middleware
const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(express.static(DIST_PATH));
  app.use(express.static(PUBLIC_PATH));
};

module.exports = applyMiddleware;
