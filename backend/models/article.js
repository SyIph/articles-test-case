const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Article extends Model {
        static associate(models) {
            Article.hasMany(models.Comment, {
                foreignKey: 'articleId'
            });
        }
    }

    Article.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        },
        {
            sequelize,
            modelName: 'Article'
        }
    );

    return Article;
};