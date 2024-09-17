// const { spawn } = require('child_process');
// const path = require('path');

// exports.removeBackground = (imagePath) => {
//   return new Promise((resolve, reject) => {
//     const pythonProcess = spawn('python3', ['scripts/remove_bg.py', imagePath]);

//     let output = '';
//     pythonProcess.stdout.on('data', (data) => {
//       output += data.toString();
//     });

//     pythonProcess.stderr.on('data', (data) => {
//       console.error(`Error: ${data}`);
//       reject(data);
//     });

//     pythonProcess.on('close', (code) => {
//       if (code === 0) {
//         const outputPath = output.trim(); // The processed image path is output by the Python script
//         resolve(outputPath);
//       } else {
//         reject(`Python script exited with code ${code}`);
//       }
//     });
//   });
// };

// // services/backgroundRemoval.js

// const fs = require('fs');
// const path = require('path');
// const { removeBackgroundFromImageBase64 } = require('@imgly/background-removal-node');

// // Function to remove background from an image
// async function removeBackground(imagePath) {
//   try {
//     console.log(`Starting background removal for: ${imagePath}`);

//     // Check if the file exists
//     if (!fs.existsSync(imagePath)) {
//       console.error(`Image file not found at path: ${imagePath}`);
//       throw new Error('Image file not found');
//     }

//     // Read the image as a base64 string
//     const inputImage = fs.readFileSync(imagePath, { encoding: 'base64' });
//     console.log(`Image read as base64: ${inputImage.substring(0, 50)}...`); // Log the start of the base64 string

//     // Attempt background removal
//     const outputImageBase64 = await removeBackgroundFromImageBase64({
//       base64img: inputImage,
//       outputFormat: 'png', // Ensure the correct format is specified
//     });

//     console.log(`Background removal successful.`); // Log success

//     // Convert base64 back to buffer and save as image file
//     const outputImageBuffer = Buffer.from(outputImageBase64, 'base64');
//     const outputPath = path.join(__dirname, '../public/uploads/output.png');
//     fs.writeFileSync(outputPath, outputImageBuffer);

//     console.log(`Output file written to: ${outputPath}`); // Log the file write
//     return outputPath;
//   } catch (error) {
//     console.error('Error during background removal:', error); // Log the exact error
//     throw error;
//   }
// }

// module.exports = {
//   removeBackground,
// };




// // services/backgroundRemoval.js

// const fs = require('fs');
// const path = require('path');
// const { execFile } = require('child_process');

// async function removeBackground(imagePath) {
//   try {
//     console.log(`Starting background removal for: ${imagePath}`);

//     // Check if the file exists
//     if (!fs.existsSync(imagePath)) {
//       console.error(`Image file not found at path: ${imagePath}`);
//       throw new Error('Image file not found');
//     }

//     const outputFileName = `output_${Date.now()}.png`;
//     const outputPath = path.join(__dirname, '../public/uploads/', outputFileName);

//     // Use rembg command-line tool
//     await new Promise((resolve, reject) => {
//       execFile('rembg', ['i', imagePath, outputPath], (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error executing rembg: ${error}`);
//           reject(error);
//         } else {
//           console.log(`rembg output: ${stdout}`);
//           resolve();
//         }
//       });
//     });

//     console.log(`Background removal successful. Output file: ${outputPath}`);
//     return outputFileName; // Return the filename to be used in views
//   } catch (error) {
//     console.error('Error during background removal:', error);
//     throw error;
//   }
// }

// module.exports = {
//   removeBackground,
// };



// // services/backgroundRemoval.js

// const fs = require('fs');
// const path = require('path');
// const { execFile } = require('child_process');

// async function removeBackground(imagePath) {
//   try {
//     console.log(`Starting background removal for: ${imagePath}`);

//     // Check if the file exists
//     if (!fs.existsSync(imagePath)) {
//       console.error(`Image file not found at path: ${imagePath}`);
//       throw new Error('Image file not found');
//     }

//     const outputFileName = `output_${Date.now()}.png`;
//     const outputPath = path.join(__dirname, '../public/uploads/', outputFileName);

//     // Use rembg command-line tool
//     await new Promise((resolve, reject) => {
//       execFile('rembg', ['i', imagePath, outputPath], (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error executing rembg: ${error}`);
//           console.error(`stderr: ${stderr}`);
//           reject(error);
//         } else {
//           console.log(`rembg stdout: ${stdout}`);
//           console.log(`rembg stderr: ${stderr}`);
//           resolve();
//         }
//       });
//     });

//     console.log(`Background removal successful. Output file: ${outputPath}`);
//     return outputFileName; // Return the filename to be used in views
//   } catch (error) {
//     console.error('Error during background removal:', error);
//     throw error;
//   }
// }

// module.exports = {
//   removeBackground,
// };


// // services/backgroundRemoval.js

// const fs = require('fs');
// const path = require('path');
// const { execFile } = require('child_process');

// async function removeBackground(imagePath) {
//   try {
//     console.log(`Starting background removal for: ${imagePath}`);

//     if (!fs.existsSync(imagePath)) {
//       console.error(`Image file not found at path: ${imagePath}`);
//       throw new Error('Image file not found');
//     }

//     const outputFileName = `output_${Date.now()}.png`;
//     const outputPath = path.join(__dirname, '../public/uploads/', outputFileName);

//     // Use the rembg executable from your virtual environment
//     const rembgPath = path.resolve(__dirname, '../venv/bin/rembg');

//     await new Promise((resolve, reject) => {
//       execFile(rembgPath, ['i', imagePath, outputPath], (error, stdout, stderr) => {
//         console.log(`Executing command: rembg i ${imagePath} ${outputPath}`);
//         if (error) {
//           console.error(`Error executing rembg: ${error}`);
//           console.error(`stderr: ${stderr}`);
//           reject(error);
//         } else {
//           console.log(`rembg stdout: ${stdout}`);
//           console.log(`rembg stderr: ${stderr}`);
//           resolve();
//         }
//       });
//     });

//     console.log(`Background removal successful. Output file: ${outputPath}`);
//     return outputFileName; // Return the filename to be used in views
//   } catch (error) {
//     console.error('Error during background removal:', error);
//     throw error;
//   }
// }

// module.exports = {
//   removeBackground,
// };


// services/backgroundRemoval.js

const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

async function removeBackground(imagePath) {
  try {
    console.log(`Starting background removal for: ${imagePath}`);

    if (!fs.existsSync(imagePath)) {
      console.error(`Image file not found at path: ${imagePath}`);
      throw new Error('Image file not found');
    }

    const outputFileName = `output_${Date.now()}.png`;
    const outputPath = path.join(__dirname, '../public/uploads/', outputFileName);

    // Use the absolute path to the rembg executable
    const rembgPath = '/Users/m/projects/slide-alchemy/venv/bin/rembg';

    await new Promise((resolve, reject) => {
      execFile(rembgPath, ['i', imagePath, outputPath], (error, stdout, stderr) => {
        console.log(`Executing command: rembg i ${imagePath} ${outputPath}`);
        if (error) {
          console.error(`Error executing rembg: ${error}`);
          console.error(`stderr: ${stderr}`);
          reject(error);
        } else {
          console.log(`rembg stdout: ${stdout}`);
          console.log(`rembg stderr: ${stderr}`);
          resolve();
        }
      });
    });

    console.log(`Background removal successful. Output file: ${outputPath}`);
    return outputFileName; // Return the filename to be used in views
  } catch (error) {
    console.error('Error during background removal:', error);
    throw error;
  }
}

module.exports = {
  removeBackground,
};
