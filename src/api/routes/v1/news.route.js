const express = require('express');
const newsController = require('./../../complex/controllers/news.controller');

const router = express.Router();

router
  .route('/')
  .get(newsController.getNews)
  .post(newsController.createNews);

module.exports = router;
