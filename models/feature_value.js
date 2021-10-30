const { Model } = require('sequelize');

class feature_value extends Model {};

exports.createFeatureValue = function(sequelize, DataTypes) {
    feature_value.init({
        featureId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        productDetailId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'feature_value',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });
    return feature_value;
}