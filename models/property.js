const { Model } = require('sequelize');

class property extends Model {}

exports.createProperty = function(sequelize, DataTypes) {
    property.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'property',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        indexes: [{
            unique: true,
            fields: ['name', 'categoryId']
        }]
    });
    return property;
}