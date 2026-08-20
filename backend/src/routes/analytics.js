const express = require('express');
const { Article, Comment } = require('../../models');
const { asyncHandler } = require('../helpers');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/comments/', asyncHandler(async (req, res) => {
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

module.exports = router;