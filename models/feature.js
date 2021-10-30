const { Model } = require('sequelize');

class feature extends Model {};

exports.createFeature = function(sequelize, DataTypes) {
    feature.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'feature',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });
    return feature;
}