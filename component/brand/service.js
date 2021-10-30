const models = require('./../../models');

exports.storeBrand = async function(brandName) {
    try {
        const brand = await models.brand.create({ name: brandName });
        return brand;
    } catch (err) {
        throw "create brand error";
    }
}

exports.getAllBrand = async function() {
    try {
        const brands = await models.brand.findAll();
        return brands;
    } catch (error) {
        throw "get all brand error";
    }
}