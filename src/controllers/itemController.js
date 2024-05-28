const Item = require('../models/Item');
const Bid = require('../models/Bid');
const Notification = require('../models/Notification');

const getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    res.json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    const { name, description, starting_price, end_time } = req.body;
    const newItem = await Item.create({
      name,
      description,
      starting_price,
      current_price: starting_price,
      end_time,
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updatedItem = await item.update(req.body);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (item.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await item.destroy();
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllItems, getItemById, createItem, updateItem, deleteItem };
