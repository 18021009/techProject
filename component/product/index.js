const express = require('express');
const { authenticate } = require('./../../middleware/auth');

const { createProductValidator, createProductPropertyValueValidation } = require('./validator');

const { getProduct, createProduct, getProducts, updateProduct, deleteProduct, createProductPropertyValue } = require('./controller');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getProducts);
    // router.get('/:id', authenticate(), getProduct);
    router.post('/', authenticate(), createProductValidator, createProduct);
    router.post('/:name', authenticate(), createProductPropertyValueValidation, createProductPropertyValue);
    // router.put('/:id', authenticate(), updateProductValidator, updateProduct);
    // router.delete('/:id', authenticate(), deleteProduct);
    app.use('/products', router);
};