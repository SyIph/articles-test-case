const express = require('express');
const { Article, Comment } = require('../models');
const { asyncHandler, errorHandler, findOrFail, findWhereOrFail } = require('./helpers');
const { Op } = require('sequelize');

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

    const comment = await findWhereOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment');

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

app.patch('/article/:articleId/comment/:commentId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');
    
    const comment = await findWhereOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment');

    await comment.update({
        text: req.body.text ?? comment.text
    });

    return res.json(comment);
}));

app.delete('/article/:articleId/comment/:commentId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');
    
    const comment = await findWhereOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment');

    await comment.destroy();

    return res.status(204).send();
}));



app.get('/analytic/comments/', asyncHandler(async (req, res) => {
    const {dateFrom, dateTo} = req.query;

    if (!dateFrom || !dateTo) {
        const error = new Error('Требуется указать dateFrom и dateTo');
        error.status = 400;
        throw error;
    }

    const from = new Date(dateFrom);
    const to = new Date(dateTo);

    if (isNaN(from.getTime()) || isNaN(to.getTime())) {
        const error = new Error('Неправильный формат дат');
        error.status = 400;
        throw error;
    }

    if (from > to) {
        const error = new Error('dateFrom должна быть раньше dateTo');
        error.status = 400;
        throw error;
    }

    const comments = await Comment.findAll({
        where: {
            createdAt: {
                [Op.between]: [from, to]
            }
        },
        include: {
            model: Article,
            attributes: ['id', 'title']
        },
        order: [
            ['createdAt', 'ASC']
        ]
    });

    const grouped = {};

    for (const comment of comments) {
        const article = comment.Article;

        if (!grouped[article.id]) {
            grouped[article.id] = {
                articleId: article.id,
                title: article.title,
                comments: []
            };
        }

        grouped[article.id].comments.push(comment);
    }

    return res.json(Object.values(grouped));
}));



app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});