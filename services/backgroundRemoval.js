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
