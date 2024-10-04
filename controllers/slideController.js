// controllers/slideController.js

const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { exec } = require('child_process');
const url = require('url'); // To parse the URL and query parameters

// Function to handle image uploads and remove background
async function handleImageUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded.',
      });
    }

    const imagePath = req.file.path;
    console.log(`Uploaded Image Path: ${imagePath}`);

    const outputFileName = await removeBackground(imagePath); // Ensure removeBackground is working
    res.json({
      imagePath: outputFileName,
    });
  } catch (error) {
    console.error('Error during background removal process:', error);
    res.status(500).json({
      error: 'Failed to remove background from the image.',
    });
  }
}


// Import the removeBackground function
const { removeBackground } = require('../services/backgroundRemoval'); // Adjust the path based on your file structure

// Function to handle image uploads and remove background
async function handleImageUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded.',
      });
    }

    const imagePath = req.file.path;
    console.log(`Uploaded Image Path: ${imagePath}`);

    // Ensure removeBackground function is working
    const outputFileName = await removeBackground(imagePath);
    res.json({
      imagePath: outputFileName,
    });
  } catch (error) {
    console.error('Error during background removal process:', error);
    res.status(500).json({
      error: 'Failed to remove background from the image.',
    });
  }
}

// Function to generate video from the generated slide
async function generateVideo(req, res) {
  // Get the full URL from the request body (should be the preview-slide URL)
  const { url: previewUrl } = req.body;

  if (!previewUrl) {
    return res.status(400).send('No URL provided.');
  }

  // Parse the URL and extract the query parameters
  const parsedUrl = url.parse(previewUrl, true);
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
  } = parsedUrl.query;

  // Ensure all required fields are present
  if (!name || !title || !eventName || !backgroundColor || !textColor || !imagePath) {
    return res.status(400).send('Some required parameters are missing.');
  }

  // Generate the corresponding /generate-slide URL by replacing 'preview-slide' with 'generate-slide'
  const generateSlideUrl = `http://localhost:3000/generate-slide?name=${encodeURIComponent(
    name
  )}&title=${encodeURIComponent(title)}&eventName=${encodeURIComponent(
    eventName
  )}&backgroundColor=${encodeURIComponent(
    backgroundColor
  )}&textColor=${encodeURIComponent(textColor)}&exportAsMp4=${exportAsMp4}&animate=${animate}&loop=${loop}&includeLogo=${includeLogo}&imagePath=${encodeURIComponent(
    imagePath
  )}`;

  console.log(`Navigating to URL: ${generateSlideUrl}`);

  try {
    // Launch a new Puppeteer browser instance
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate Puppeteer to the /generate-slide page (not the preview-slide)
    await page.goto(generateSlideUrl, { waitUntil: 'networkidle0' });

    // Set the viewport to the required resolution
    await page.setViewport({ width: 1280, height: 720 }); // Adjusted to PowerPoint aspect ratio

    // Directory to store the frames
    const framesDir = path.join(__dirname, '../public/uploads/frames');
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    // Capture frames
    for (let i = 0; i < 10; i++) {
      const framePath = path.join(framesDir, `frame-${String(i).padStart(3, '0')}.png`);
      console.log(`Capturing frame ${i + 1}...`);
      await page.screenshot({ path: framePath });
    }

    // Close Puppeteer
    await browser.close();

    const videoOutputPath = path.join(__dirname, '../public/uploads/video.mp4');

    // Use FFmpeg to combine the frames into a video
    const command = `ffmpeg -y -framerate 30 -i ${framesDir}/frame-%03d.png -c:v libx264 -pix_fmt yuv420p ${videoOutputPath}`;
    console.log('Starting FFmpeg with command:', command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`FFmpeg error: ${error.message}`);
        console.error(`FFmpeg stderr: ${stderr}`);
        return res.status(500).send('Error generating video');
      }

      console.log('FFmpeg stdout:', stdout);
      console.log('FFmpeg completed successfully!');

      // Clean up the frames directory after creating the video
      fs.rmdirSync(framesDir, { recursive: true });

      // Send back the filename for download
      res.json({ filename: 'video.mp4', videoUrl: `/uploads/video.mp4` });
    });
  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Export the functions
module.exports = {
  handleImageUpload,
  generateVideo,
};
