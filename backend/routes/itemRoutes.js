const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

router.post('/', itemController.createItem);
router.get('/', itemController.getAllItems);
// Add other routes for update and delete if needed

module.exports = router;
