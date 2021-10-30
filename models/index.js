const config = require('config');
const { Sequelize, DataTypes } = require('sequelize');

const { createBrand } = require('./brand');
const { createCategory } = require('./category');
const { createFeature } = require('./feature');
const { createProduct } = require('./product');
const { createProperty_value } = require('./property_value');
const { createProperty } = require('./property');
const { createUser } = require('./user');
const { createRefreshToken } = require('./refreshToken');
const { createFeatureValue } = require('./feature_value');

const db = config.get('db').development;


const sequelize = new Sequelize(db.database, db.username, db.password, {
    host: db.host,
    dialect: db.dialect,
});

const models = {}

models.brand = createBrand(sequelize, DataTypes);
models.category = createCategory(sequelize, DataTypes);
models.feature = createFeature(sequelize, DataTypes);
models.product = createProduct(sequelize, DataTypes);
models.property_value = createProperty_value(sequelize, DataTypes);
models.property = createProperty(sequelize, DataTypes);
models.user = createUser(sequelize, DataTypes);
models.refresh_token = createRefreshToken(sequelize, DataTypes);
models.feature_value = createFeatureValue(sequelize, DataTypes);

models.sequelize = sequelize;

module.exports = models;

// models.sequelize.sync({ force: true });