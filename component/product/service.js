const models = require('./../../models');

async function getAllProduct() {
    try {
        const result = await models.product.findAll({ raw: true });
        return result;
    } catch (error) {
        throw "get allProduct error";
    }
}

async function storeProduct({ name, categoryName }) {
    try {
        const category = await getCategory({ name: categoryName });
        return (await models.product.create({ name, categoryId: category.id })).dataValues;
    } catch (error) {
        if (error == "this category does not exist") {
            throw error;
        }
        if (error.name == "SequelizeUniqueConstraintError") {
            throw "product already exists";
        }
    }
}

async function getProperty({ name, categoryId }) {
    try {
        const property = await models.property.findOne({
            raw: true,
            where: {
                name,
                categoryId,
            }
        });
        if (property.id) {
            return property;
        }
    } catch (error) {
        throw "this property does not exist";
    }
}

async function getCategory({ id, name }) {
    try {
        var category;
        if (id) {
            category = await models.category.findOne({
                raw: true,
                where: {
                    id,
                }
            });
        } else {
            category = await models.category.findOne({
                raw: true,
                where: {
                    name,
                }
            });
        }
        if (category.id) {
            return category;
        }
    } catch (error) {
        throw "category does not exist";
    }
}

async function getAllProductProperty({ categoryId }) {
    try {
        const properties = await models.property.findAll({
            raw: true,
            where: {
                categoryId,
            }
        });
        for (var i = 0; i < properties.length; i++) {
            delete properties[i].id;
            delete properties[i].categoryId;
        }
        return properties;
    } catch (error) {
        throw error;
    }
}

async function storePropertyValue({ productId, propertyId, value }) {
    try {
        const propertyValue = await models.property_value.create({ productId, propertyId, value });
        return propertyValue.dataValues;
    } catch (error) {
        console.error(error);
        throw "error in store property_value";
    }
}

async function storeProductPropertiesValue({ name, categoryName, properties }) {
    try {
        const category = await getCategory({ name: categoryName });
        console.log(category);
        const product = await getProduct({ name, categoryId: category.id });
        console.log(product);
        for (var i = 0; i < properties.length; i++) {
            var property = await getProperty({ name: properties[i].name, categoryId: category.id });
            console.log(property);
            await destroyPropertyValue({ productId: product.id, propertyId: property.id });
            await storePropertyValue({ productId: product.id, propertyId: property.id, value: properties[i].value });
        }
        return true;
    } catch (error) {
        throw error;
    }
}

async function getProduct({ id, name, categoryId }) {
    try {
        var product;
        if (id) {
            product = await models.product.findAll({
                raw: true,
                where: {
                    id,
                }
            });
        } else {
            product = await models.product.findOne({
                raw: true,
                where: {
                    name,
                    categoryId,
                }
            });
        }
        if (product.id) {
            return product;
        }
    } catch (error) {
        throw "this product does not exist";
    }
}

async function destroyPropertyValue({ productId, propertyId }) {
    try {
        await models.property_value.destroy({
            where: {
                propertyId,
                productId,
            }
        });
    } catch (error) {
        throw "error in destroyPropertyValue";
    }
}

module.exports = { getAllProduct, storeProduct, getAllProductProperty, getCategory, storeProductPropertiesValue }