const { Model } = require('sequelize');

class product extends Model {};

exports.createProduct = function(sequelize, DataTypes) {
    product.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // brandId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
    }, {
        sequelize,
        modelName: 'product',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        indexes: [{
            unique: true,
            fields: ['name', 'categoryId']
        }]
    });
    return product;
}