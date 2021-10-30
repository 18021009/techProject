const jwt = require('jsonwebtoken');
const config = require('config');

// const SECRET_ACCESS_TOKEN = config.get("auth").SECRET_ACCESS_TOKEN_KEY;
// const SECRET_REFRESH_TOKEN_KEY = config.get("auth").SECRET_REFRESH_TOKEN_KEY;

// // console.log(SECRET_ACCESS_TOKEN)
// const user = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InF1YW5ncGh1Y3RxMi42Iiwib2ZmaWNpYWwiOiJzZGZzZGZkIiwiaWF0IjoxNjM0MjM5Njk2LCJleHAiOjE2MzQyNDE0OTZ9.4F-Q-G1ySwa5pn2Egy4XDKOEt4xVg43eaEaGob85iVI", SECRET_REFRESH_TOKEN_KEY);

// console.log(user);

function temp(object) {
    try {
        if (object.id) {
            console.log('id');
        } else {
            console.log('st')
        }
    } catch (e) {
        console.log('e');
        console.log(e)
    }
}
temp();