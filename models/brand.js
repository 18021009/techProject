const { Model } = require('sequelize');

class brand extends Model {};

exports.createBrand = function(sequelize, Datatype) {
    brand.init({
        name: {
            type: Datatype.STRING,
            allowNull: false,
            unique: true,
        }
    }, {
        sequelize,
        modelName: 'brand',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });
    return brand;
}