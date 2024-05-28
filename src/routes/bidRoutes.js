const express = require('express');
const { getAllBidsForItem, placeBid } = require('../controllers/bidController');
const authenticateToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:itemId/bids', getAllBidsForItem);
router.post('/:itemId/bids', authenticateToken, placeBid);

module.exports = router;
