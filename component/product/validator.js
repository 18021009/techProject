const Joi = require('joi');
const { respondSuccess, respondWithError } = require('./../../helper/messageResponse');

exports.createProductValidator = function(req, res, next) {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        categoryName: Joi.string()
            .required(),
    });

    const { data } = req.body;

    const { error } = schema.validate(data);
    if (error) {
        res.status(500);
        return res.json(respondWithError(error));
    } else {
        return next();
    }
}

exports.createProductPropertyValueValidation = function(req, res, next) {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
        categoryName: Joi.string()
            .required(),
        properties: Joi.array()
            .required(),
    });
    const propertySchema = Joi.object({
        name: Joi.string()
            .required(),
        value: Joi.number()
            .required(),
    });
    const { data } = req.body;
    var result = schema.validate(data);
    if (result.error) {
        res.status(500);
        res.json(respondWithError(error));
    }
    for (var i = 0; i < data.properties.length; i++) {
        result = propertySchema.validate(data.properties[i]);
        if (result.error) {
            res.status(500);
            res.json(respondWithError(error));
        }
    }
    next();
}