// const path = require('path');
// const { spawn } = require('child_process');

// // Controller to handle image upload and display info form
// exports.uploadImage = (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No image uploaded.');
//   }
//   const imagePath = req.file.path;
//   res.render('add-info', { imagePath });
// };

// // Controller to generate slide
// exports.generateSlide = (req, res) => {
//   const { speakerName, speakerTitle, backgroundHex, textHex } = req.body;
//   const imagePath = req.body.imagePath; // Path of the uploaded image

//   // Call the Python script to remove the background from the image
//   const pythonProcess = spawn('python3', ['scripts/remove_bg.py', imagePath]);

//   pythonProcess.stdout.on('data', (data) => {
//     console.log(`Python script output: ${data}`);
//   });

//   pythonProcess.on('close', (code) => {
//     if (code === 0) {
//       // Render the final "Done" page with the generated slide
//       res.render('done', { speakerName, speakerTitle, backgroundHex, textHex });
//     } else {
//       res.status(500).send('Error processing image.');
//     }
//   });
// };


// // controllers/slideController.js

// const path = require('path');
// const { removeBackground } = require('../services/backgroundRemoval');

// // Function to handle image uploads and remove background
// async function handleImageUpload(req, res) {
//   try {
//     // Get the image path after upload
//     const imagePath = path.join(__dirname, '../public/uploads', req.file.filename);
    
//     console.log(`Uploaded Image Path: ${imagePath}`);  // Log the uploaded image path

//     // Call the background removal function
//     const outputImagePath = await removeBackground(imagePath);

//     // Send the processed image path in the response
//     res.status(200).json({ message: 'Background removed', originalImage: imagePath, outputImage: outputImagePath });
//   } catch (error) {
//     console.error('Error during background removal process:', error);
//     res.status(500).json({ error: 'Failed to remove background' });
//   }
// }

// module.exports = {
//   handleImageUpload,
// };


// // controllers/slideController.js

// const path = require('path');
// const { removeBackground } = require('../services/backgroundRemoval');
// const fs = require('fs');

// // Function to handle image uploads and remove background
// async function handleImageUpload(req, res) {
//   try {
//     // Check if a file was uploaded
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // Get the path to the uploaded image
//     const imagePath = req.file.path;

//     console.log(`Uploaded Image Path: ${imagePath}`); // Log the uploaded image path

//     // Call the background removal function
//     const outputFileName = await removeBackground(imagePath);

//     // Optionally delete the original uploaded image to save space
//     // fs.unlink(imagePath, (err) => {
//     //   if (err) {
//     //     console.error(`Error deleting original image: ${err}`);
//     //   } else {
//     //     console.log(`Deleted original image: ${imagePath}`);
//     //   }
//     // });

//     // Extract form data (if any)
//     const {
//       name = '',
//       title = '',
//       eventName = '',
//       backgroundColor = 'FFFFFF', // Default to white if not provided
//       textColor = '000000',       // Default to black if not provided
//       exportAsMp4,
//       animate,
//       loop,
//       includeLogo,
//     } = req.body;

//     // Send the processed image to the preview-slide view
//     res.render('preview-slide', {
//       imagePath: outputFileName, // Pass the output image filename to the view
//       name,
//       title,
//       eventName,
//       backgroundColor,
//       textColor,
//       exportAsMp4,
//       animate,
//       loop,
//       includeLogo,
//     });
//   } catch (error) {
//     console.error('Error during background removal process:', error);
//     res.status(500).send('Failed to remove background from the image.');
//   }
// }

// module.exports = {
//   handleImageUpload,
// };



// // controllers/slideController.js

// const path = require('path');
// const { removeBackground } = require('../services/backgroundRemoval');
// const fs = require('fs');

// // Function to handle image uploads and remove background
// async function handleImageUpload(req, res) {
//   try {
//     // Check if a file was uploaded
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // Get the path to the uploaded image
//     const imagePath = req.file.path;

//     console.log(`Uploaded Image Path: ${imagePath}`); // Log the uploaded image path

//     // Call the background removal function
//     const outputFileName = await removeBackground(imagePath);

//     // Optionally delete the original uploaded image to save space
//     // fs.unlink(imagePath, (err) => {
//     //   if (err) {
//     //     console.error(`Error deleting original image: ${err}`);
//     //   } else {
//     //     console.log(`Deleted original image: ${imagePath}`);
//     //   }
//     // });

//     // Redirect to /add-info with the output image path
//     res.redirect(`/add-info?imagePath=${encodeURIComponent(outputFileName)}`);
//   } catch (error) {
//     console.error('Error during background removal process:', error);
//     res.status(500).send('Failed to remove background from the image.');
//   }
// }

// module.exports = {
//   handleImageUpload,
// };


// controllers/slideController.js

const path = require('path');
const { removeBackground } = require('../services/backgroundRemoval');
const fs = require('fs');

// Function to handle image uploads and remove background
async function handleImageUpload(req, res) {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    // Get the path to the uploaded image
    const imagePath = req.file.path;

    console.log(`Uploaded Image Path: ${imagePath}`); // Log the uploaded image path

    // Call the background removal function
    const outputFileName = await removeBackground(imagePath);

    // Optionally delete the original uploaded image to save space
    // fs.unlink(imagePath, (err) => {
    //   if (err) {
    //     console.error(`Error deleting original image: ${err}`);
    //   } else {
    //     console.log(`Deleted original image: ${imagePath}`);
    //   }
    // });

    // Send JSON response with the output image path
    res.json({ imagePath: outputFileName });
  } catch (error) {
    console.error('Error during background removal process:', error);
    res.status(500).json({ error: 'Failed to remove background from the image.' });
  }
}

module.exports = {
  handleImageUpload,
};
