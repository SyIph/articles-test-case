const express = require('express');
const { Article } = require('../models');
const { asyncHandler, errorHandler } = require('./helpers');

const articleRouter = require('./routes/articles');
const commentRouter = require('./routes/comments');
const analyticsRouter = require('./routes/analytics');

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/articles/', asyncHandler(async (req, res) => {
    const articles = await Article.findAll();

    return res.json(articles);
}));

app.use('/article/:articleId', commentRouter);

app.use('/analytic', analyticsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});