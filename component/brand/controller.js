const { getAllBrand, storeBrand } = require('./service');
const { respondWithError, respondSuccess } = require('./../../helper/messageResponse');

exports.getBrands = async function(req, res) {
    try {
        const allBrand = await getAllBrand();
        return res.json(respondSuccess(allBrand));
    } catch (error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
}

exports.createBrand = async function(req, res) {
    const { data } = req.body;
    try {
        const brand = await storeBrand(data.name);
        return res.json(respondSuccess(brand));
    } catch (error) {
        res.status(500);
        res.json(respondWithError(error));
    }
}