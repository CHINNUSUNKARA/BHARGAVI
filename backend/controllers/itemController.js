// controllers/itemController.js
const mongoose = require('mongoose');
const Item = require('../models/Item');

// CREATE a new Item (with nested brands/categories if provided)
exports.createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error saving new item:', error);
    res.status(500).json({ error: 'Failed to save new item', details: error.message });
  }
};

// GET all Items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const param = req.params.id; // Use 'id' as defined in the route
    let item;

    // Check if the parameter is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(param)) {
      item = await Item.findById(param);
    }

    // If no item found by ID, try looking up by name (case insensitive)
    if (!item) {
      item = await Item.findOne({ name: new RegExp(`^${param}$`, "i") });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ error: "Failed to fetch item" });
  }
};


// Get an item by its name (exact match, case insensitive)
exports.getItemByName = async (req, res) => {
  try {
    const { itemName } = req.params;
    const item = await Item.findOne({ name: new RegExp(`^${itemName}$`, "i") });
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching item by name:", error);
    res.status(500).json({ error: "Failed to fetch item by name" });
  }
};



// Get an item by its name and filter brands by a search keyword
// controllers/itemController.js
exports.getBrandsByItemName = async (req, res) => {
  try {
    const { id } = req.params; // Parameter from route

    let item;

    // Check if the parameter is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      // Try finding the item by its ObjectId
      item = await Item.findById(id);
    } else {
      // If not a valid ObjectId, try finding by name (case-insensitive)
      item = await Item.findOne({ name: new RegExp(`^${id}$`, "i") });
    }

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Return only the brands array
    res.json(item.brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands" });
  }
};


// UPDATE an existing Item by id
exports.updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: 'Item not found' });
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Failed to update item', details: error.message });
  }
};

// DELETE an Item by id
exports.deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndRemove(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Failed to delete item', details: error.message });
  }
};

// UPDATE a Brand within an Item
exports.updateBrand = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const { name, categories } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    // Update provided fields
    if (name) brand.name = name;
    if (categories) brand.categories = categories;
    await item.save();
    res.json(brand);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Failed to update brand', details: error.message });
  }
};

// ADD a new Brand to an Item
exports.addBrand = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, categories } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    // Create a new brand subdocument.
    const newBrand = {
      _id: new mongoose.Types.ObjectId(),
      name,
      categories: categories || []
    };

    item.brands.push(newBrand);
    await item.save();
    res.status(201).json(newBrand);
  } catch (error) {
    console.error('Error adding brand:', error);
    res.status(500).json({ error: 'Failed to add brand', details: error.message });
  }
};

// DELETE a Brand within an Item
exports.deleteBrand = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    // Remove the brand subdocument
    brand.remove();
    await item.save();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Failed to delete brand', details: error.message });
  }
};

// ADD a Category to a Brand within an Item
exports.addCategory = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const { name } = req.body; // assuming category consists of a name property
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    const newCategory = { _id: new mongoose.Types.ObjectId(), name };
    brand.categories.push(newCategory);
    await item.save();
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: 'Failed to add category', details: error.message });
  }
};

// UPDATE a Category within a Brand
exports.updateCategory = async (req, res) => {
  try {
    const { itemId, brandId, categoryId } = req.params;
    const { name } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    const category = brand.categories.id(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    if (name) category.name = name;
    await item.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

// DELETE a Category within a Brand
exports.deleteCategory = async (req, res) => {
  try {
    const { itemId, brandId, categoryId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    const category = brand.categories.id(categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.remove();
    await item.save();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};

// GET all Categories for a specific Brand in an Item
exports.getCategories = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    res.json(brand.categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

// GET a single Brand from an Item by brandId
exports.getBrand = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = item.brands.id(brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    res.json(brand);
  } catch (error) {
    console.error('Error fetching brand:', error);
    res.status(500).json({ error: 'Failed to fetch brand', details: error.message });
  }
};
