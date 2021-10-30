const express = require('express');
const { authenticate } = require('./../../middleware/auth');
const { getBrands, createBrand } = require('./controller');
const { createBrandValitation } = require('./validator');


module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getBrands);
    // router.get('/:id', authenticate(), getBrand);
    router.post('/', authenticate(), createBrandValitation, createBrand);
    // router.put('/:id', authenticate(), updateBrandValitation, updateBrand);
    // router.delete('/:id', authenticate(), deleteBrand);
    app.use('/brands', router);
}