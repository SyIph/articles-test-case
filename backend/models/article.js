const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Articles extends Model {}

    Articles.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Articles'
        }
    );
};