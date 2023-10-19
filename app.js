const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes'); // Import your product routes

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// MongoDB configuration
mongoose.connect('mongodb://localhost:27017/DressStore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Use the product routes
app.use('/api', productRoutes);

// Define other routes or middleware as needed

app.get('/', (req, res) => {
  res.send('{"message":"Welcome to the DressStore Application."}');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
