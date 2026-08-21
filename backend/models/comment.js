const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Comment extends Model  {
        static associate(models) {
            Comment.belongsTo(models.Article, {
                foreignKey: 'articleId'
            });
        }
    }

    Comment.init(
        {
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            articleId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Comment'
        }
    );

    return Comment;
};