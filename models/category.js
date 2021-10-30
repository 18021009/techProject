const { Model } = require('sequelize');

class category extends Model {}

exports.createCategory = function(sequelize, DataTypes) {
    category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'category',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });
    return category;
}