const express = require('express');
const { Article, Comment } = require('../../models');
const { asyncHandler, findOrFail, findWhereOrFail } = require('../helpers');

const router = express.Router({
    mergeParams: true
});

router.post('/comment/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    const comment = await Comment.create({
        text: req.body.text,
        articleId: article.id
    });

    return res.status(201).json(comment);
}));

router.get('/comment/:commentId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');

    const comment = await findWhereOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment');

    return res.json(comment);
}));

router.get('/comments/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');
    
    const comments = await Comment.findAll({
        where: {
            articleId: article.id
        },
        order: [
            ['createdAt', 'ASC']
        ]
    });

    return res.json(comments);
}));

router.patch('/comment/:commentId/', asyncHandler(async (req, res) => {
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

router.delete('/comment/:commentId/', asyncHandler(async (req, res) => {
    const article = await findOrFail(Article, req.params.articleId, 'Article');
    
    const comment = await findWhereOrFail(Comment, {
        id: req.params.commentId,
        articleId: article.id
    }, 'Comment');

    await comment.destroy();

    return res.status(204).send();
}));

module.exports = router;