const express = require('express');
const { authenticate } = require('./../../middleware/auth');

const { createCategoryValidation, updateCategoryValidation, createCategoryPropertiesValidation } = require('./validator');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory, createCategoryProperties, getCategoryProperties } = require('./controller');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', authenticate(), getCategories);
    router.post('/', authenticate(), createCategoryValidation, createCategory);
    router.post('/:name', authenticate(), createCategoryPropertiesValidation, createCategoryProperties);
    router.get('/:name', authenticate(), getCategoryProperties);
    // router.put('/:id', authenticate(), updateCategoryValidation, updateCategory);
    // router.delete('/:id', authenticate(), deleteCategory);
    app.use('/categories', router);
}