const { Model } = require('sequelize');

class property_value extends Model {};

exports.createProperty_value = function(sequelize, DataTypes) {
    property_value.init({
        propertyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'property_value',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
        indexes: [{
            unique: true,
            fields: ['productId', 'propertyId']
        }],
    })
    return property_value;
}