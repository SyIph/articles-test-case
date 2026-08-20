const express = require('express');
const { Article } = require('../../models');
const { asyncHandler, findOrFail } = require('../helpers');

const router = express.Router();

router.post('/article/', asyncHandler(async (req, res) => {
    const article = await Article.create({
        title: req.body.title,
        text: req.body.text
    });

    return res.status(201).json(article);
}));

router.get('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    return res.json(article);
}));

router.get('/articles/', asyncHandler(async (req, res) => {
    const articles = await Article.findAll();

    return res.json(articles);
}));

router.patch('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    await article.update({
        title: req.body.title ?? article.title,
        text: req.body.text ?? article.text
    });

    return res.json(article);
}));

router.delete('/article/:articleId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    await article.destroy();

    return res.status(204).send();
}));

module.exports = router;