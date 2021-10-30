const { respondSuccess, respondWithError } = require('./../../helper/messageResponse');
const { getAllCategory, storeCategory, getCategory, storeProperty, getAllCategoryProperty, destroyCategoryProperties } = require('./service');


exports.getCategories = async function(req, res) {
    try {
        const categories = await getAllCategory();
        for (var i = 0; i < categories.length; i++) {
            delete categories[i].id;
        }
        return res.json(respondSuccess(categories));
    } catch (error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
}

exports.getCategory = async function(req, res) {

}

exports.createCategory = async function(req, res) {
    const { data } = req.body;
    try {
        const category = await storeCategory(data);
        delete category.id;
        res.json(respondSuccess(category));
    } catch (error) {
        res.status(500);
        res.json(respondWithError(error));
    }
}

exports.updateCategory = async function(req, res) {

}

exports.deleteCategory = async function(req, res) {

}

exports.createCategoryProperties = async function(req, res) {
    const { data } = req.body;
    const { properties } = data;
    const { name } = req.params;
    try {
        var category = await getCategory({ name });
        await destroyCategoryProperties(category);
        for (var i = 0; i < properties.length; i++) {
            await storeProperty({ name: properties[i].name, categoryId: category.id });
        }
        return res.json(respondSuccess({ name, properties }));
    } catch (error) {
        res.status(500);
        res.json(respondWithError(error));
    }
}

exports.getCategoryProperties = async function(req, res) {
    const { name } = req.params;
    try {
        const categoryProperties = await getAllCategoryProperty({ name });
        for (var i = 0; i < categoryProperties.length; i++) {
            delete categoryProperties[i].id;
            delete categoryProperties[i].categoryId;
        }
        return res.json(respondSuccess({ name, properties: categoryProperties }));
    } catch (error) {
        res.json(respondWithError(error));
    }
}