const jwt = require('jsonwebtoken');
const models = require('../../models/index.js');
const config = require('config');
const bCrypt = require('bcrypt');

const SECRET_ACCESS_TOKEN_KEY = config.get("auth").SECRET_ACCESS_TOKEN_KEY;
const SECRET_REFRESH_TOKEN_KEY = config.get("auth").SECRET_REFRESH_TOKEN_KEY;
const SECRET_ACCESS_TOKEN_EXPIRE = config.get("auth").SECRET_ACCESS_TOKEN_EXPIRE;
const SECRET_REFRESH_TOKEN_EXPIRE = config.get("auth").SECRET_REFRESH_TOKEN_EXPIRE;
const passwordSaltRounds = config.get("passwordSaltRounds");

function hashPassword(password) {
    const hashPassword = bCrypt.hashSync(password, passwordSaltRounds);
    return hashPassword;
}

async function storeUser(data) {
    const password = hashPassword(data.password);
    try {
        const user = await models.user.create({
            userName: data.userName,
            password: password,
        });
        return user;
    } catch (error) {
        console.log(error.name)
        if (error.name == "SequelizeUniqueConstraintError") {
            console.log("SequelizeUniqueConstraintError");
            throw "user was already exists";
        }
        throw "error in storeUser";
    }
}


async function findUser(userName) {
    try {
        const user = await models.user.findOne({
            where: { userName },
        });
        if (user) {
            return user.dataValues;
        } else { return null; }
    } catch (error) {
        throw "findUser error";
    }
};

function createAccessToken(user) {
    const accessToken = jwt.sign({ userName: user.userName }, SECRET_ACCESS_TOKEN_KEY, { expiresIn: SECRET_ACCESS_TOKEN_EXPIRE });
    return accessToken;
}

function createRefreshToken(user) {
    const refreshToken = jwt.sign({ userName: user.userName }, SECRET_REFRESH_TOKEN_KEY, { expiresIn: SECRET_REFRESH_TOKEN_EXPIRE });
    return refreshToken;
}

async function saveRefreshToken(userId, refreshToken) {
    try {
        const userRefToken = {
            userId,
            refreshToken,
        }
        await models.refresh_token.create(userRefToken);
    } catch (error) {
        throw error.name;
    }
}

// check password return false if wrong password
function isValidPassword(loginPassword, userPass) {
    return bCrypt.compareSync(loginPassword, userPass);
}

async function deleteRefreshToken(userId) {
    try {
        await models.refresh_token.destroy({
            where: {
                userId,
            }
        });
    } catch (error) {
        throw "deleteRefreshToken error ";
    }
}

async function checkRefreshToken(userId) {
    try {
        var refreshToken = await models.refreshToken.findOne({ where: { userId } });
        if (refreshToken) {
            return true;
        } else { return false; }
    } catch (error) {
        throw "checkRefreshToken error ";
    }
}


async function getRefreshToken(userId) {
    try {
        const refreshToken = await models.refreshToken.findOne({
            where: { userId: userId },
        });
        return refreshToken.dataValues.refreshToken;
    } catch (error) {
        throw "getRefreshToken error ";
    }
}






module.exports = { storeUser, hashPassword, findUser, createAccessToken, createRefreshToken, isValidPassword, saveRefreshToken, deleteRefreshToken, checkRefreshToken, getRefreshToken };