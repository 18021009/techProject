const { isValidPassword, createAccessToken, createRefreshToken, saveRefreshToken, deleteRefreshToken, storeUser, findUser, checkRefreshToken, getRefreshToken } = require('./authService');
const { respondSuccess, respondWithError } = require('./../../helper/messageResponse');

async function login(req, res) {
    const { data } = req.body;
    var user, accessToken, refreshToken;

    try {
        user = await findUser(data.userName);
        // if can not found user
        if (!user) {
            res.status(500);
            return res.json(respondWithError("can not found user"));
        }
        // check password
        if (isValidPassword(data.password, user.password)) {
            delete user.password;
            accessToken = createAccessToken(user);
            refreshToken = createRefreshToken(user);
            await saveRefreshToken(user.id, refreshToken);
            return res.json(respondSuccess({ user: user, accessToken: accessToken, refreshToken: refreshToken }));
        } else {
            res.status(500);
            res.json(respondWithError("password is incorrect"));
        }
    } catch (error) {
        if (error == "SequelizeUniqueConstraintError") {
            console.log(user);
            await deleteRefreshToken(user.id);
            await saveRefreshToken(user.id, refreshToken);
            return res.json(respondSuccess({ user: user, accessToken: accessToken, refreshToken: refreshToken }));
        }
        res.status(500);
        res.json(error);
    }
}

async function signUp(req, res) {
    const { data } = req.body;
    try {
        const user = await storeUser({ userName: data.userName, password: data.password });
        const accessToken = createAccessToken(user);
        const refreshToken = createRefreshToken(user);
        delete user.password;
        console.log(user);
        await saveRefreshToken(user.id, refreshToken);
        return res.json(respondSuccess({ user: user, accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        res.status(500);
        return res.json(respondWithError(error));
    }
}


async function getProfile(req, res) {
    try {
        const { loginUser } = req.body;
        const { userName } = loginUser;
        const userInfo = await findUser(userName);
        delete userInfo.password;
        if (userInfo) {
            return res.json(respondSuccess(data = userInfo));
        } else { return res.json(respondWithError(code = '', message = 'error')); }
    } catch (e) {
        return res.json(respondWithError(code = '', message = 'error'));
    }
}

async function logout(req, res) {
    const userName = req.params.userName;
    console.log(userName);
    try {
        const user = await findUser(userName);
        await deleteRefreshToken(user.id);
        res.json(respondSuccess({ message: 'logout success' }));
    } catch (error) {
        res.json(respondWithError('logout error'));
    }
}

async function refreshToken(req, res) {
    var { loginUser } = req.body;
    var { userName } = loginUser;
    var user;
    try {
        user = await findUser(userName);
        delete user.password;
        if (await checkRefreshToken(user.userId)) {
            var accessToken = createAccessToken(user);
            return res.json({ data: user, accessToken: accessToken, refreshToken: await getRefreshToken(user.userId) });
        } else {
            return res.json(respondWithError(message = 'refreshToken have been removed'));
        }
    } catch (e) {
        res.json(respondWithError(code = 'login failed', ));
    }
}

// export async function getProfile(req, res){
//     try {
//         const {loginUser} = req.body;
//         const user = await models.users.findOne({
//             where: {
//                 userName: loginUser.userName,
//             }
//         });
//         return res.send(user);
//     }catch(e){
//         console.log(e);
//         throw e;
//     }
// }

module.exports = { login, signUp, getProfile, logout, refreshToken }