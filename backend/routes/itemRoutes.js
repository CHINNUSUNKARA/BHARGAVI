// routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { default: mongoose } = require('mongoose');

/* ==========================================================
   ITEM Endpoints
   - POST '/'                -> create a new item
   - GET '/'                 -> fetch all items
   - PUT '/:id'              -> update an item by its id
   - GET '/id/:id'           -> fetch a single item by a valid ObjectId or name fallback
   - DELETE '/:id'           -> delete an item by its id
============================================================ */
router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);
router.put('/:id', itemController.updateItem);
router.get('/id/:id', itemController.getItem);
router.delete('/:id', itemController.deleteItem);

/* ==========================================================
   BRAND Endpoints within an Item
   NOTE:
   - GET '/name/:itemName'          -> fetch an item by exact name
   - GET '/name/:itemName/brands'     -> fetch brands of an item by name lookup
   - GET '/id/:id/brands'             -> fetch brands of an item by id lookup
   - POST '/:itemId/brands'           -> add a new brand to the specified item
   - GET '/:itemId/brands/:brandId'   -> get a specific brand (dual lookup using id or name under controllers)
   - PUT '/:itemId/brands/:brandId'   -> update a brand within an item
   - DELETE '/:itemId/brands/:brandId'-> delete a brand from an item
============================================================ */
router.get('/name/:itemName', itemController.getItemByName);
router.get('/name/:itemName/brands', itemController.getBrandsByItemName);
router.get('/id/:id/brands', itemController.getBrandsByItemName);

router.post('/:itemId/brands', itemController.addBrand);
router.put('/:itemId/brands/:brandName', itemController.updateBrand);
router.delete('/:itemId/brands/:brandName', itemController.deleteBrand);


/* ==========================================================
   CATEGORY Endpoints within a Brand
   - POST '/:itemId/brands/:brandId/categories'                 -> add a new category to a brand within an item
   - GET '/:itemId/brands/:brandId/categories'                    -> fetch all categories in a brand
   - PUT '/:itemId/brands/:brandId/categories/:categoryId'        -> update a specific category
   - DELETE '/:itemId/brands/:brandId/categories/:categoryId'     -> delete a specific category
============================================================ */
router.post('/brands/:brandName/categories', itemController.addCategory);

router.get('/items/id/:id/brands/:brandName', itemController.getBrandDetails);
router.get('/items/name/:itemName/brands/:brandName', itemController.getBrandDetails);

router.get('/brands/:brandId/categories', itemController.getCategories);
router.get('/brands/:brandName/categories', itemController.getCategories);

router.put('/:itemId/brands/:brandName/categories/:categoryId', itemController.updateCategory);
router.delete('/:itemId/brands/:brandName/categories/:categoryId', itemController.deleteCategory);

/* ==========================================================
   PRICE Endpoints within a Category
   - POST '/:itemId/brands/:brandId/categories/:categoryId'                 -> add a new price to a category
   - GET '/:itemId/brands/:brandId/categories/:categoryId'                    -> fetch all prices in a category
   - PUT '/:itemId/brands/:brandId/categories/:categoryId/prices/:priceId'    -> update a specific price
   - DELETE '/:itemId/brands/:brandId/categories/:categoryId/prices/:priceId' -> delete a specific price
============================================================ */
router.get('/id/:itemId/:brandName/:categoryName', itemController.getPriceByNames);
router.put('/id/:itemId/:brandName/:categoryName', itemController.updatePriceByNames);
router.delete('/id/:itemId/:brandName/:categoryName', itemController.deletePriceByNames);

const validateObjectId = (req, res, next) => {
   if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
     return res.status(400).json({ error: "Invalid ID format" });
   }
   next();
 };
 router.get('/id/:id', validateObjectId, itemController.getItem);
 


module.exports = router;
