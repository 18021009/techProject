const Joi = require('joi');
const { respondWithError } = require('./../../helper/messageResponse');

function loginValidator(req, res, next) {
    const validSchema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    })

    const { data } = req.body;

    const { error } = validSchema.validate(data);
    if (error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
    next();
}


function signUpValidator(req, res, next) {
    const validSchema = Joi.object({
        userName: Joi.string().required(),
        password: Joi.string().required(),
    });
    const { data } = req.body;
    const { error } = validSchema.validate(data);
    if (error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
    next();
}


// export function profileValidator(req, res, next) {
//     const {userName, uerId} = req.body;
//     const validSchema = Joi.object()({
//         userName: Joi.string().required(),
//         userId: Joi.string().required(),
//     });

//     const {error, value} = validSchema.validate({userName, userId});
//     if(error){
//         return res.send("profile not validator");
//     }
//     next();
// }

// export function passwordValidator(req, res, next){
//     const {oldPassword, newPassword} = req.body;
//     const validSchema = Joi.object({
//         oldPassword: Joi.string().required(),
//         newPassword: Joi.string().required(),
//     });

//     const {error, value} = validSchema.validate({oldPassword, newPassword});
//     if(error){
//         return res.send("not validate");
//     }
//     next();
// }


function logoutValidator(req, res, next) {
    const { userId } = req.body;
    const validSchema = Joi.object({
        userId: Joi.string().required(),
    })

    const { error, value } = validSchema.validate({ userId });
    if (error) {
        return res.send("not validate");
    }
    next();
}


module.exports = { logoutValidator, signUpValidator, loginValidator }