require('dotenv').config(); // Load variables from .env file

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure the uploads directory exists
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log('Created uploads directory:', uploadDir);
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Define Item Schema
const itemSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  images: [String], // Array of image file paths
});

const Item = mongoose.model('Item', itemSchema);

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// API to list an item
app.post('/api/items', upload.array('images', 4), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  const { name, category, price } = req.body;
  const images = req.files.map((file) => file.path);

  try {
    const newItem = new Item({ name, category, price, images });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error saving item:', error);
    res.status(500).json({ error: 'An error occurred while listing the item.' });
  }
});

//API fetch items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'An error occurred while fetching items.' });
  }
});

//Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});