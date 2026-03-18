const express = require('express');
const axios = require('axios');
const Message = require('../models/Message');
const { authenticateAdmin } = require('../middleware/adminAuth');

const router = express.Router();

// Public: create a new message from website
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, body } = req.body;

    if (!name || !email || !body) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and message body are required',
      });
    }

    const message = await Message.create({
      name,
      email,
      subject,
      body,
    });

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Create message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message',
    });
  }
});

// Admin-only below
router.use(authenticateAdmin);

// List messages (with basic pagination)
router.get('/', async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 20);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      Message.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Message.countDocuments({}),
    ]);

    res.json({
      success: true,
      data: items,
      pagination: {
        page,
        limit,
        total,
      },
    });
  } catch (error) {
    console.error('List messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load messages',
    });
  }
});

// Get single message
router.get('/:id', async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).lean();
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }
    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Get message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load message',
    });
  }
});

// Reply to a message via email
router.post('/:id/reply', async (req, res) => {
  try {
    const { replyText } = req.body;
    if (!replyText) {
      return res.status(400).json({
        success: false,
        message: 'Reply text is required',
      });
    }

    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found',
      });
    }

    const { BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME } = process.env;

    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
      return res.status(500).json({
        success: false,
        message: 'Brevo email configuration is missing',
      });
    }

    const subject = message.subject
      ? `Re: ${message.subject}`
      : 'Reply from Kulinjis clan';

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: BREVO_SENDER_NAME || 'Kulinjis Clan',
          email: BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: message.email,
            name: message.name,
          },
        ],
        subject,
        textContent: replyText,
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    message.status = 'replied';
    message.replyText = replyText;
    message.repliedAt = new Date();
    await message.save();

    res.json({
      success: true,
      data: message,
    });
  } catch (error) {
    console.error('Reply message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send reply',
    });
  }
});

module.exports = router;

