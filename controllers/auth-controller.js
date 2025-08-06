

const Admin = require('../models/admin');
const FeedBack = require('../models/feedBack');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerFeedBack = async (req, res) => {
  try {
    const { name, email, message, type, status,comments} = req.body;
        const timestamp = new Date();
   // Create new Feedback
    const newFeedBack = new FeedBack({
      name, 
      email, 
      message,
      type, 
      timestamp, 
      status,
      comments
    });

    await newFeedBack.save();
    console.info('Feedback Received successfully')

    res.status(201).json({ message: 'Received a user feedback' });

  } catch (error) {
    console.log('Registration Error:', error);
    res.status(500).json({ message: 'Server error during the registration of the feedback' });
  }
};
 
    const registerAdmin = async (req, res) => {
  try {
    const { name,email,password,role } = req.body;
 
    // Check if admin already exists (case insensitive)
    const existingAdmin = await Admin.findOne({ name: name.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newAdmin = new Admin({
      name: name.toLowerCase(),
      email,
      password: hashedPassword,
      role,
    });

    await newAdmin.save();
    console.info('Registration successful')

    res.status(201).json({ message: 'Admin registered successfully' });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};


const adminLogin = async (req, res) => {
  try {
    const { name, password } = req.body;
    const normalizedAdminName = name.trim().toLowerCase()

    // Find user by username (case insensitive)
    const admin = await Admin.findOne({ name: normalizedAdminName });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with userId and role
    const token = jwt.sign(
      { adminId: admin._id,
         role: admin.role 
        },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );//jwt.sign(payload, secretOrPrivateKey, options)

    res.status(200).json({
      message: 'Login successful',
      token,
      adminId: admin._id,
      role: admin.role,
    });

  } catch (error) {
    console.log('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};


module.exports = {
  registerFeedBack,
  registerAdmin,
  adminLogin
}