const { array } = require('joi');
const Joi = require('joi');
const { respondWithError } = require('./../../helper/messageResponse');

exports.createCategoryValidation = function(req, res, next) {
    const { data } = req.body;
    schema = Joi.object({
        name: Joi.string()
            .required(),
    });

    const { error } = schema.validate(data);
    if (!error) {
        return next();
    } else {
        res.status(500);
        return res.json(respondWithError(error));
    }
}

exports.createCategoryPropertiesValidation = function(req, res, next) {
    const { data } = req.body;
    const schema = Joi.object({
        properties: Joi.array()
            .required()
    });
    const propertyValue = Joi.object({
        name: Joi.string()
            .required(),
    });
    const { properties } = data;
    var result = schema.validate(data);
    if (result.error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
    for (var i = 0; i < properties.length; i++) {
        result = propertyValue.validate(properties[i]);
        if (result.error) {
            res.status(500);
            return res.json(respondWithError(result.error));
        }
    }
    next();
}