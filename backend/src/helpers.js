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

const findOrFail = async (model, id, targetName = 'Target') => {
    const target = await model.findByPk(id);

    if (!target) {
        const error = new Error(`${targetName} not found`);
        error.status = 404;
        throw error;
    }

    return target;
};

module.exports = {asyncHandler, errorHandler, findOrFail};