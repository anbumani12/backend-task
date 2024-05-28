const { Item } = require('../models');
const { getPagination, getPagingData } = require('../utils/pagination');

const createItem = async (itemData) => {
  const item = await Item.create(itemData);
  return item;
};

const updateItem = async (itemId, itemData) => {
  const item = await Item.findByPk(itemId);
  if (!item) throw new Error('Item not found');

  await item.update(itemData);
  return item;
};

const deleteItem = async (itemId) => {
  const item = await Item.findByPk(itemId);
  if (!item) throw new Error('Item not found');

  await item.destroy();
  return item;
};

const getItemById = async (itemId) => {
  const item = await Item.findByPk(itemId);
  return item;
};

const getAllItems = async (page, size) => {
  const { limit, offset } = getPagination(page, size);
  const data = await Item.findAndCountAll({ limit, offset });
  return getPagingData(data, page, limit);
};

module.exports = { createItem, updateItem, deleteItem, getItemById, getAllItems };
