// controllers/itemController.js
const mongoose = require('mongoose');
const Item = require('../models/Item');

/*
  Helper functions for dual lookup.
  These functions try to find a nested subdocument (brand or category)
  using an ObjectId if the parameter is valid; otherwise, they fall back
  to a case‑insensitive lookup by name.
*/

// Find a brand from an item using either its ObjectId or its name.
const getBrandFromItem = (item, brandParam) => {
  let brand;
  if (mongoose.Types.ObjectId.isValid(brandParam)) {
    brand = item.brands.id(brandParam);
  }
  if (!brand) {
    brand = item.brands.find(b => b.name.toLowerCase() === brandParam.toLowerCase());
  }
  return brand;
};

// Find a category from a brand using either its ObjectId or its name.
const getCategoryFromBrand = (brand, categoryParam) => {
  let category;
  if (mongoose.Types.ObjectId.isValid(categoryParam)) {
    category = brand.categories.id(categoryParam);
  }
  if (!category) {
    category = brand.categories.find(c => c.name.toLowerCase() === categoryParam.toLowerCase());
  }
  return category;
};

/*==========================
   ITEM CONTROLLERS
==========================*/

// CREATE a new Item (with nested brands/categories if provided)
exports.createItem = async (req, res) => {
  try {
    const { name, brands } = req.body;

    // Validate the input
    if (!name) {
      return res.status(400).json({ error: "The `name` field is required" });
    }

    // Create a new item
    const newItem = new Item({
      name,
      brands,
    });

    // Save the item to the database
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error saving new item:", error);
    res.status(500).json({ error: "Failed to create item", details: error.message });
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

// GET a single Item by id or by name (fallback)
exports.getItem = async (req, res) => {
  try {
    const param = req.params.id; // use 'id' from route (/id/:id)
    let item;
    if (mongoose.Types.ObjectId.isValid(param)) {
      item = await Item.findById(param);
    }
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

// GET an Item by its name (exact match, case insensitive)
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

/*==========================
   BRAND CONTROLLERS (Nested in Item)
==========================*/

// GET a single Brand from an Item (by id or name)
exports.getBrand = async (req, res) => {
  try {
    const param = req.params.brandName; // use 'brandName' from route

    let item = await Item.findById(req.params.id); // Fetch the item first
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    const brand = getBrandFromItem(item, param);
    if (!brand) {
      return res.status(404).json({ error: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ error: "Failed to fetch brand" });
  }
};

exports.getBrandByName = async (req, res) => {
  try {
    const { brandName } = req.params;
    const brand = await getBrandFromItem.findOne({ name: new RegExp(`^${brandName}$`, "i") });
    if (!brand) {
      return res.status(404).json({ error: "brand not found" });
    }
    res.json(brand);
  } catch (error) {
    console.error("Error fetching brand by name:", error);
    res.status(500).json({ error: "Failed to fetch brand by name" });
  }
};

// GET all Brands for an Item (lookup by id or name)
exports.getBrandsByItemName = async (req, res) => {
  try {
    const { id, itemName } = req.params; // Extract id and itemName from params
    let item;

    // Handle lookup by ObjectId or itemName
    if (id && mongoose.Types.ObjectId.isValid(id)) {
      item = await Item.findById(id);
    } else if (itemName) {
      item = await Item.findOne({ name: new RegExp(`^${itemName}$`, "i") }); // Case-insensitive name search
    } else {
      return res.status(400).json({ error: "Invalid or missing parameters" });
    }

    // Check if item was found
    if (!item) return res.status(404).json({ error: "Item not found" });

    // Respond with the brands
    res.json(item.brands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Failed to fetch brands", details: error.message });
  }
};

// ADD a new Brand to an Item
exports.addBrand = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, categories } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

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

// GET a specific Brand within an Item (by id or name)
exports.getBrandDetails = (req, res) => {
  try {
      // Ensure that req.params has the required fields
      const { itemId, brandsName } = req.params;

      if (!itemId || !brandsName) {
          return res.status(400).json({ error: "Item ID or Brand Name is missing" });
      }

      // Your logic to fetch the item and brand details from DB goes here...
      // Assuming you have a model called 'Item' which is imported at the top
      
      Item.findOne({ _id: itemId, 'brands.name': brandsName }, (err, item) => {
          if (err) {
              return res.status(500).json({ error: "Error fetching brand details", details: err.message });
          }
          if (!item) {
              return res.status(404).json({ error: "Item or Brand not found" });
          }

          // Find the brand within the found item
          const brands = item.brands.find(b => b.name === brandsName);
          if (!brands) {
              return res.status(404).json({ error: "Brand not found" });
          }

          // Return the brand details in the response
          res.status(200).json({ brands});
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch brand details", details: error.message });
  }
};


// UPDATE a Brand within an Item (by id or name)
exports.updateBrand = async (req, res) => {
  try {
    const { itemId, brandId} = req.params;
    const { name, categories } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = getBrandFromItem(item, brandId );
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    if (name) brand.name = name;
    if (categories) brand.categories = categories;
    await item.save();
    res.json(brand);
  } catch (error) {
    console.error('Error updating brand:', error);
    res.status(500).json({ error: 'Failed to update brand', details: error.message });
  }
};

// DELETE a Brand within an Item (by id or name)
exports.deleteBrand = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = getBrandFromItem(item, brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    brand.remove();
    await item.save();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting brand:', error);
    res.status(500).json({ error: 'Failed to delete brand', details: error.message });
  }
};

/*==========================
   CATEGORY CONTROLLERS (Nested in Brand)
==========================*/

// ADD a Category to a Brand within an Item
exports.addCategory = async (req, res) => {
  try {
    const { itemId, brandId } = req.params;
    const { name } = req.body; // Assuming a category is defined by a name
    if (!name) return res.status(400).json({ error: 'Category name is required' });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = getBrandFromItem(item, brandId);
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


exports.getCategories = async (req, res) => {
  try {
    // Expect itemId and either brandId or brandName in parameters
    const { itemId, brandId, brandName } = req.params;

    // Find the item by its ObjectId
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    let brand;

    // Lookup brand by ID or name
    if (brandId) {
      brand = item.brands.find((b) => b._id.toString() === brandId);
    } else if (brandName) {
      brand = item.brands.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
    }

    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    // Return the categories array belonging to that brand
    res.json(brand.categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories', details: error.message });
  }
};

// UPDATE a Category within a Brand (by id or name)
exports.updateCategory = async (req, res) => {
  try {
    const { itemId, brandId, categoryId } = req.params;
    const { name } = req.body;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = getBrandFromItem(item, brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    let category = getCategoryFromBrand(brand, categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    if (name) category.name = name;
    await item.save();
    res.json(category);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Failed to update category', details: error.message });
  }
};

// DELETE a Category within a Brand (by id or name)
exports.deleteCategory = async (req, res) => {
  try {
    const { itemId, brandId, categoryId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const brand = getBrandFromItem(item, brandId);
    if (!brand) return res.status(404).json({ error: 'Brand not found' });

    const category = getCategoryFromBrand(brand, categoryId);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.remove();
    await item.save();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Failed to delete category', details: error.message });
  }
};

/* ===============================
   PRICE CONTROLLERS (by names)
   These functions expect:
     - itemName: e.g. "iron"
     - brandName: e.g. "Stainsteel"
     - categoryName: e.g. "Normal"
   They will search in a case-insensitive way.
=============================== */

// GET the price from a variant (category) for a given item and brand
exports.getPriceByNames = async (req, res) => {
  try {
    const { itemName, brandName, categoryName } = req.params;
    
    // Find the item by name (case-insensitive)
    const item = await Item.findOne({ name: new RegExp(`^${itemName}$`, "i") });
    if (!item) return res.status(404).json({ error: "Item not found" });

    // Find the brand from the item's brands array
    const brand = item.brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    if (!brand) return res.status(404).json({ error: "Brand not found" });

    // Find the category from the brand's categories array
    const category = brand.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (!category) return res.status(404).json({ error: "Category not found" });

    res.json({ price: category.price });
  } catch (error) {
    console.error("Error fetching price:", error);
    res.status(500).json({ error: "Failed to fetch price", details: error.message });
  }
};

// UPDATE (or add) the price for a given item/brand/category combination
exports.updatePriceByNames = async (req, res) => {
  try {
    const { itemName, brandName, categoryName } = req.params;
    const { price } = req.body;

    // Validate that the price is provided, numeric, and non-negative.
    if (price === undefined || isNaN(price) || Number(price) < 0) {
      return res.status(400).json({ error: "A valid non-negative price is required" });
    }

    // Find the item by name (case-insensitive)
    const item = await Item.findOne({ name: new RegExp(`^${itemName}$`, "i") });
    if (!item) return res.status(404).json({ error: "Item not found" });

    // Find the brand within the item
    const brand = item.brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    if (!brand) return res.status(404).json({ error: "Brand not found" });

    // Find the category within the brand
    const category = brand.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (!category) return res.status(404).json({ error: "Category not found" });

    // Update the price
    category.price = Number(price);
    await item.save();
    res.json({ price: category.price });
  } catch (error) {
    console.error("Error updating price:", error);
    res.status(500).json({ error: "Failed to update price", details: error.message });
  }
};

// DELETE the price for a given item/brand/category combination
// (Here we simply reset the price to 0; adjust as needed.)
exports.deletePriceByNames = async (req, res) => {
  try {
    const { itemName, brandName, categoryName } = req.params;
    
    // Find the item by name (case-insensitive)
    const item = await Item.findOne({ name: new RegExp(`^${itemName}$`, "i") });
    if (!item) return res.status(404).json({ error: "Item not found" });
    
    // Find the brand
    const brand = item.brands.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    if (!brand) return res.status(404).json({ error: "Brand not found" });
    
    // Find the category
    const category = brand.categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
    if (!category) return res.status(404).json({ error: "Category not found" });
    
    // Reset the price (or remove it depending on your business logic)
    category.price = 0;
    await item.save();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting price:", error);
    res.status(500).json({ error: "Failed to delete price", details: error.message });
  }
};
