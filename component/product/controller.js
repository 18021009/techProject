const { respondWithError, respondSuccess } = require('./../../helper/messageResponse');
const { getAllProduct, storeProduct, getCategory, getAllProductProperty, storeProductPropertiesValue } = require('./service');

exports.getProducts = async function(req, res) {
    try {
        const products = await getAllProduct();
        for (var i = 0; i < products.length; i++) {
            delete products[i].id;
            products[i].categoryName = (await getCategory({ id: products[i].categoryId })).name;
            delete products[i].categoryId;
        }
        return res.json(respondSuccess(products));
    } catch (error) {
        res.status(500);
        console.log(error);
        return res.json(respondWithError("error in get products"));
    }
}



exports.createProduct = async function(req, res) {
    const { data } = req.body;
    const { name, categoryName } = data;
    try {
        const product = await storeProduct(data);
        delete product.id;
        const properties = await getAllProductProperty({ categoryId: product.categoryId });
        for (var i = 0; i < properties.length; i++) {
            delete properties[i].id;
            delete properties[i].categoryId;
        }
        res.json(respondSuccess({ name, categoryName, properties }));
    } catch (error) {
        res.status(500);
        res.json(respondWithError(error));
    }
}


exports.createProductPropertyValue = async function(req, res) {
    const { data } = req.body;
    const { name, categoryName, properties } = data;
    try {
        if (await storeProductPropertiesValue({ name, categoryName, properties })) {
            res.send('success');
        }
    } catch (error) {
        res.send(error);
    }
}