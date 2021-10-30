const authRouter = require('../component/auth');
const categoryRouter = require('../component/category');
const brandRouter = require('../component/brand');
const productRouter = require('../component/product');

const routerManager = (app) => {
    authRouter(app);
    categoryRouter(app);
    // brandRouter(app);
    productRouter(app);
};

module.exports = routerManager;