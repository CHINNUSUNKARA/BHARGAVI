// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Item endpoints
router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);
router.put('/:id', itemController.updateItem);
router.get('/id/:id', itemController.getItem);
router.delete('/:id', itemController.deleteItem);

// Brand endpoints within an item
router.get('/name/:itemName', itemController.getItemByName);
router.get('/name/:itemName/brands', itemController.getBrandsByItemName);
router.get('/id/:id/brands', itemController.getBrandsByItemName);
router.post('/:itemId/brands', itemController.addBrand);
router.get('/:itemId/brands/:brandId', itemController.getBrand);
router.put('/:itemId/brands/:brandId', itemController.updateBrand);
router.delete('/:itemId/brands/:brandId', itemController.deleteBrand);

// Category endpoints within a brand
router.post('/:itemId/brands/:brandId/categories', itemController.addCategory);
router.get('/:itemId/brands/:brandId/categories', itemController.getCategories);
router.put('/:itemId/brands/:brandId/categories/:categoryId', itemController.updateCategory);
router.delete('/:itemId/brands/:brandId/categories/:categoryId', itemController.deleteCategory);

module.exports = router;
