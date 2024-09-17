// routes/index.js

const express = require('express');
const multer = require('multer');
const { handleImageUpload } = require('../controllers/slideController');
const path = require('path');
const router = express.Router();

// Set up Multer for file uploads (ensure the public/uploads folder exists)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage }); // Use the custom storage configuration

// Route to handle image upload
router.post('/upload', upload.single('image'), handleImageUpload);

// Route to serve the homepage (index)
router.get('/', (req, res) => {
  res.render('index');
});

// Route to serve the /add-info page
router.get('/add-info', (req, res) => {
  const { imagePath } = req.query; // Capture the imagePath from the query parameters
  res.render('add-info', { imagePath });
});

// Handle form submission from /add-info (POST request)
router.post('/add-info', (req, res) => {
  const { name, title, eventName, backgroundColor, textColor, imagePath } = req.body;

  res.redirect(
    `/slide-properties?name=${encodeURIComponent(name)}&title=${encodeURIComponent(
      title
    )}&eventName=${encodeURIComponent(eventName)}&backgroundColor=${encodeURIComponent(
      backgroundColor
    )}&textColor=${encodeURIComponent(textColor)}&imagePath=${encodeURIComponent(imagePath)}`
  );
});

// Route to serve the /slide-properties page
router.get('/slide-properties', (req, res) => {
  const { name, title, eventName, backgroundColor, textColor, imagePath } = req.query;

  res.render('slide-properties', {
    name,
    title,
    eventName,
    backgroundColor,
    textColor,
    imagePath,
  });
});

// Handle form submission from /slide-properties (POST request)
router.post('/slide-properties', (req, res) => {
  const {
    name,
    title,
    eventName,
    backgroundColor,
    textColor,
    exportAsMp4,
    animate,
    loop,
    includeLogo,
    imagePath,
  } = req.body;

  res.redirect(
    `/preview-slide?name=${encodeURIComponent(name)}&title=${encodeURIComponent(
      title
    )}&eventName=${encodeURIComponent(eventName)}&backgroundColor=${encodeURIComponent(
      backgroundColor
    )}&textColor=${encodeURIComponent(textColor)}&exportAsMp4=${exportAsMp4}&animate=${animate}&loop=${loop}&includeLogo=${includeLogo}&imagePath=${encodeURIComponent(
      imagePath
    )}`
  );
});

// Route to serve the /preview-slide page
router.get('/preview-slide', (req, res) => {
  const {
    name,
    title,
    eventName,
    backgroundColor,
    textColor,
    exportAsMp4,
    animate,
    loop,
    includeLogo,
    imagePath,
  } = req.query;

  res.render('preview-slide', {
    name,
    title,
    eventName,
    backgroundColor,
    textColor,
    exportAsMp4,
    animate,
    loop,
    includeLogo,
    imagePath,
  });
});

module.exports = router;
