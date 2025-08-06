// config/db.js
const mongoose = require('mongoose');

const connectToDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ebongvalentine70:ebongvalentine70@cluster0.46sfar3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
//mongodb+srv://ebongvalentine70:<db_password>@cluster0.kspaxqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0