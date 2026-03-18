const express = require('express');
const GalleryCategory = require('../models/GalleryCategory');
const GalleryItem = require('../models/GalleryItem');
const Message = require('../models/Message');
const AdminUser = require('../models/AdminUser');
const { authenticateAdmin } = require('../middleware/adminAuth');

const router = express.Router();

router.use(authenticateAdmin);

// Summary stats for dashboard
router.get('/summary', async (req, res) => {
  try {
    const [categoryCount, itemCount, messageCount, newMessageCount, adminCount] =
      await Promise.all([
        GalleryCategory.countDocuments({}),
        GalleryItem.countDocuments({}),
        Message.countDocuments({}),
        Message.countDocuments({ status: 'new' }),
        AdminUser.countDocuments({}),
      ]);

    res.json({
      success: true,
      data: {
        categoryCount,
        itemCount,
        messageCount,
        newMessageCount,
        adminCount,
      },
    });
  } catch (error) {
    console.error('Admin summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data',
    });
  }
});

module.exports = router;

