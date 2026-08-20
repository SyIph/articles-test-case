const express = require('express');
const { Article } = require('../models');
const { asyncHandler, errorHandler, findOrFail } = require('./helpers');

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(errorHandler);



app.post('/article/', asyncHandler(async (req, res) => {
    const article = await Article.create({
        title: req.body.title,
        text: req.body.text
    });

    return res.status(200).json(article);
}));

app.get('/article/:id/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.id, 'Article');

    return res.json(article);
}));

app.get('/articles/', asyncHandler(async (req, res) => {
    const articles = await Article.findAll();

    return res.json(articles);
}));

app.patch('/article/:id/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.id, 'Article');

    await article.update({
        title: req.body.title ?? article.title,
        text: req.body.text ?? article.text
    });

    return res.json(article);
}));

app.delete('/article/:id/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.id, 'Article');

    await article.destroy();

    return res.status(204).send();
}));



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});