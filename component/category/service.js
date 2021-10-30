const models = require('./../../models/index');

async function getAllCategory() {
    try {
        const categories = await models.category.findAll({ raw: true });
        return categories;
    } catch (error) {
        throw error;
    }
}


async function storeCategory(category) {
    const { name } = category;
    try {
        const category = await models.category.create({ name });
        return category.dataValues;
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError') {
            throw "this category already exist";
        }
        throw "create category error";
    }
}

async function getCategory(category) {
    const { id, name } = category;
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
        throw "this category does not exist";
    }
}

async function storeProperty(property) {
    const { name, categoryId } = property;
    try {
        const property = await models.property.create({
            name,
            categoryId,
        });
        return property.dataValues;
    } catch (error) {
        if (error == "this category does not exist") {
            throw error;
        }

        if (error.name == "SequelizeUniqueConstraintError") {
            throw "this property already exist";
        }
    }
}

async function getAllCategoryProperty(category) {
    try {
        var properties;
        if (category.id) {
            properties = await models.property.findAll({
                raw: true,
                where: {
                    categoryId: category.id,
                }
            });
        } else {
            const categoryId = (await getCategory(category)).id;
            properties = await models.property.findAll({
                raw: true,
                where: {
                    categoryId,
                }
            });
        }
        return properties;
    } catch (error) {
        if (error == "this category does not exist") {
            throw error;
        }
        throw "get categoryProperties error";
    }
}

async function destroyCategoryProperties(category) {
    try {
        await models.property.destroy({
            where: {
                categoryId: category.id,
            }
        });
    } catch (error) {
        throw "error in destroyCategoryProperties";
    }
}

module.exports = { getCategory, storeProperty, getAllCategoryProperty, getAllCategory, storeCategory, destroyCategoryProperties };