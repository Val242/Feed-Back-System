require('dotenv').config();
const express = require('express');
const app = express();
const PORT =  3000;
const authRoutes = require('./routes/auth')
const feedBackRoute = require('./routes/feedbackRoute')
const connectToDB = require("./config/db")

app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/feedback', feedBackRoute);



app.use((err, req, res, next) => {
  if (err) {
    console.error('Error:', err.message);
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

 connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
