const Joi = require('joi');

exports.createBrandValitation = function(req, res, next) {
    const schema = Joi.object({
        name: Joi.string()
            .required(),
    });

    const { data } = req.body;
    const { error } = schema.validate(data);

    if (error) {
        return res.send(error);
    } else {
        return next();
    }
}

exports.updateBrandValitation = function(req, res, next) {

}