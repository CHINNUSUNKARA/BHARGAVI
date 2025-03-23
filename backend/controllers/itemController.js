const Item = require('../models/Item');

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

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('stockCategoryId', 'name');
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};
