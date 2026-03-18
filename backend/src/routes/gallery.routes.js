const express = require('express');
const multer = require('multer');
const GalleryCategory = require('../models/GalleryCategory');
const GalleryItem = require('../models/GalleryItem');
const { authenticateAdmin } = require('../middleware/adminAuth');
const { cloudinary } = require('../config/cloudinary');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Public endpoints
router.get('/categories', async (req, res) => {
  try {
    const categories = await GalleryCategory.find({ isActive: true })
      .sort({ createdAt: 1 })
      .lean();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load categories',
    });
  }
});

router.get('/items', async (req, res) => {
  try {
    const { categoryKey, search, limit = 100 } = req.query;
    const query = { isPublished: true };

    if (categoryKey && categoryKey !== 'all') {
      const cat = await GalleryCategory.findOne({
        key: categoryKey.toString().toLowerCase(),
        isActive: true,
      });

      if (!cat) {
        return res.json({ success: true, data: [] });
      }

      query.category = cat._id;
    }

    if (search) {
      const regex = new RegExp(search.toString(), 'i');
      query.$or = [
        { title: regex },
        { caption: regex },
        { alt: regex },
        { tags: regex },
      ];
    }

    const items = await GalleryItem.find(query)
      .populate('category', 'key name')
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .lean();

    res.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error('Get gallery items error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load gallery items',
    });
  }
});

// Admin endpoints
router.use(authenticateAdmin);

// Upload image to Cloudinary and return URL
router.post(
  '/upload',
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Image file is required',
        });
      }

      const folder =
        process.env.CLOUDINARY_FOLDER ||
        'kulinjis';

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder,
          },
          (error, result) => {
            if (error) return reject(error);
            return resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      const { secure_url: url, public_id: publicId } = uploadResult;

      return res.status(201).json({
        success: true,
        url,
        publicId,
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to upload image',
      });
    }
  }
);

// Categories CRUD
router.post('/categories', async (req, res) => {
  try {
    const { key, name, description, isActive = true } = req.body;

    if (!key || !name) {
      return res.status(400).json({
        success: false,
        message: 'Key and name are required',
      });
    }

    const normalisedKey = key.toString().toLowerCase().replace(/\s+/g, '-');

    const exists = await GalleryCategory.findOne({ key: normalisedKey });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: 'Category key already exists',
      });
    }

    const category = await GalleryCategory.create({
      key: normalisedKey,
      name,
      description,
      isActive,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
    });
  }
});

router.patch('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { key, name, description, isActive } = req.body;

    const update = {};
    if (typeof key === 'string') {
      update.key = key.toLowerCase().replace(/\s+/g, '-');
    }
    if (typeof name === 'string') update.name = name;
    if (typeof description === 'string') update.description = description;
    if (typeof isActive === 'boolean') update.isActive = isActive;

    const category = await GalleryCategory.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category',
    });
  }
});

router.delete('/categories/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const inUse = await GalleryItem.exists({ category: id });
    if (inUse) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category while items are using it',
      });
    }

    const result = await GalleryCategory.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    res.json({
      success: true,
      message: 'Category deleted',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
    });
  }
});

// Gallery items CRUD
router.post('/items', async (req, res) => {
  try {
    const {
      categoryId,
      title,
      caption,
      alt,
      imageUrl,
      isPublished = true,
      tags = [],
    } = req.body;

    if (!categoryId || !imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Category and image URL are required',
      });
    }

    const category = await GalleryCategory.findById(categoryId);
    if (!category || !category.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or inactive category',
      });
    }

    const item = await GalleryItem.create({
      category: categoryId,
      title,
      caption,
      alt,
      imageUrl,
      isPublished,
      tags,
    });

    res.status(201).json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Create gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create gallery item',
    });
  }
});

router.patch('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      categoryId,
      title,
      caption,
      alt,
      imageUrl,
      isPublished,
      tags,
    } = req.body;

    const update = {};
    if (categoryId) update.category = categoryId;
    if (typeof title === 'string') update.title = title;
    if (typeof caption === 'string') update.caption = caption;
    if (typeof alt === 'string') update.alt = alt;
    if (typeof imageUrl === 'string') update.imageUrl = imageUrl;
    if (typeof isPublished === 'boolean') update.isPublished = isPublished;
    if (Array.isArray(tags)) update.tags = tags;

    const item = await GalleryItem.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error('Update gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update gallery item',
    });
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await GalleryItem.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found',
      });
    }

    res.json({
      success: true,
      message: 'Gallery item deleted',
    });
  } catch (error) {
    console.error('Delete gallery item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item',
    });
  }
});

module.exports = router;

