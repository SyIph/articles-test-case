const express = require('express');
const { Article } = require('../models');

const PORT = 3000;

const app = express();

app.use(express.json());

const asyncHandler = (handler) => {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            next(error);
        }
    }
};

const errorHandler = (error, req, res, next) => {
    res.status(500).json({ 
        error: error.message
    });
};

app.use(errorHandler);



app.post('/article/', asyncHandler(async (req, res) => {
    const article = await Article.create({
        title: req.body.title,
        text: req.body.text
    });

    return res.status(200).json(article);
}));

app.get('/article/:id/', asyncHandler(async (req, res) => {
    const article = await Article.findByPk(req.params.id);

    if (!article) {
        return res.status(404).json({
            error: 'Article not found'
        });
    }

    return res.json(article);
}));

app.get('/articles/', asyncHandler(async (req, res) => {
    const articles = await Article.findAll();

    return res.json(articles);
}));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});