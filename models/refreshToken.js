const { Model } = require('sequelize');

class refreshToken extends Model {};

exports.createRefreshToken = function(sequelize, DataTypes) {
    refreshToken.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'refresh_token',
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName: true,
    });
    return refreshToken;
}