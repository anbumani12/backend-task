const Bid = require('../models/Bid');
const Item = require('../models/Item');
const Notification = require('../models/Notification');

const getAllBidsForItem = async (req, res) => {
  try {
    const bids = await Bid.findAll({ where: { item_id: req.params.itemId } });
    res.json(bids);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const placeBid = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { bid_amount } = req.body;

    const item = await Item.findByPk(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (new Date() > new Date(item.end_time)) {
      return res.status(400).json({ message: 'Auction ended' });
    }

    if (bid_amount <= item.current_price) {
      return res.status(400).json({ message: 'Bid amount must be higher than current price' });
    }

    const newBid = await Bid.create({
      item_id: itemId,
      user_id: req.user.id,
      bid_amount,
    });

    await item.update({ current_price: bid_amount });

    // Notify item owner
    await Notification.create({
      user_id: item.user_id,
      message: `New bid on your item: ${item.name}`,
    });

    res.status(201).json(newBid);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getAllBidsForItem, placeBid };
