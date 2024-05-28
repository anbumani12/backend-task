const { Bid, Item, User } = require('../models');

const placeBid = async (itemId, userId, bidAmount) => {
  const item = await Item.findByPk(itemId);
  if (!item) throw new Error('Item not found');

  if (bidAmount <= item.current_price) throw new Error('Bid must be higher than the current price');

  const bid = await Bid.create({ item_id: itemId, user_id: userId, bid_amount: bidAmount });
  await item.update({ current_price: bidAmount });

  return bid;
};

const getBidsForItem = async (itemId) => {
  const bids = await Bid.findAll({ where: { item_id: itemId }, include: [User] });
  return bids;
};

module.exports = { placeBid, getBidsForItem };
