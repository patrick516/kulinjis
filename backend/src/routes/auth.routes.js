const express = require('express');
const bcrypt = require('bcryptjs');
const { generateAdminToken } = require('../middleware/adminAuth');
const AdminUser = require('../models/AdminUser');

const router = express.Router();

// Admin registration (creates an admin user in MongoDB)
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'First name, last name, email and password are required',
      });
    }

    const existing = await AdminUser.findOne({
      email: email.toLowerCase(),
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: 'An admin with this email already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = await AdminUser.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      passwordHash,
    });

    const token = generateAdminToken({
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role,
    });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to register admin',
    });
  }
});

// Admin login: first check MongoDB users, then optional env fallback
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const loweredEmail = email.toLowerCase();

    // 1) Try DB admin
    const admin = await AdminUser.findOne({ email: loweredEmail });
    if (admin) {
      const isValid = await bcrypt.compare(password, admin.passwordHash);
      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      const token = generateAdminToken({
        id: admin._id.toString(),
        email: admin.email,
        role: admin.role,
      });

      return res.json({
        success: true,
        token,
        user: {
          id: admin._id,
          firstName: admin.firstName,
          lastName: admin.lastName,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // 2) Fallback to env-based single admin (optional)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || (!adminPassword && !adminPasswordHash)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (loweredEmail !== adminEmail.toLowerCase()) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    let isValidPassword = false;

    if (adminPasswordHash) {
      isValidPassword = await bcrypt.compare(password, adminPasswordHash);
    } else if (adminPassword) {
      isValidPassword = password === adminPassword;
    }

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateAdminToken({
      id: 'env-admin',
      email: adminEmail,
      role: 'admin',
    });

    return res.json({
      success: true,
      token,
      user: {
        email: adminEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to login',
    });
  }
});

module.exports = router;

