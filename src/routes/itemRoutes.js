const express = require('express');
const { getAllItems, getItemById, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authenticateToken, authorizeRoles('admin', 'user'), createItem);
router.put('/:id', authenticateToken, authorizeRoles('admin', 'user'), updateItem);
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'user'), deleteItem);

module.exports = router;
