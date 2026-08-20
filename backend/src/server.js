const express = require('express');
const { errorHandler } = require('./helpers');

const articleRouter = require('./routes/articles');
const commentRouter = require('./routes/comments');
const analyticsRouter = require('./routes/analytics');

const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use(articleRouter);

app.use('/article/:articleId', commentRouter);

app.use('/analytic', analyticsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});