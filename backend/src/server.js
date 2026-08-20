const express = require('express');
const { Article, Comment } = require('../models');
const { asyncHandler, errorHandler, findOrFail } = require('./helpers');

const PORT = 3000;

const app = express();

app.use(express.json());



app.post('/article/', asyncHandler(async (req, res) => {
    const article = await Article.create({
        title: req.body.title,
        text: req.body.text
    });

    return res.status(201).json(article);
}));

app.get('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    return res.json(article);
}));

app.get('/articles/', asyncHandler(async (req, res) => {
    const articles = await Article.findAll();

    return res.json(articles);
}));

app.patch('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    await article.update({
        title: req.body.title ?? article.title,
        text: req.body.text ?? article.text
    });

    return res.json(article);
}));

app.delete('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    await article.destroy();

    return res.status(204).send();
}));



app.post('/article/:articleId/comment/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    const comment = await Comment.create({
        text: req.body.text,
        articleId: article.id
    });

    return res.status(201).json(comment);
}));

app.get('/article/:articleId/comment/:commentId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    const comment = await findOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment', true);

    return res.json(comment);
}));

app.get('/article/:articleId/comments/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');
    
    const comments = await Comment.findAll({
        where: {
            articleId: article.id
        }
    });

    return res.json(comments);
}));



app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});