import fs from 'fs'; // Use 'import' instead of 'require'
import path from 'path'; // Use 'import' instead of 'require'
import { exec } from 'child_process'; // Use 'import' instead of 'require'
import { fileURLToPath } from 'url';

// Use import.meta.url to get the current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output directory for compiled Go files
const outputPath = path.join(__dirname, "outputs");

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath);
}

export const executePython = async (filepath) => {
  return new Promise((resolve, reject) => {
    // Execute Python file using python command (or python3 if that's your setup)
    exec(`python ${filepath}`, (error, stdout, stderr) => {
      if (error) {
        reject(error); // Return error if there's an issue in execution
      }
      if (stderr) {
        reject(stderr); // Return stderr for runtime errors in the script
      }
      resolve(stdout); // Return the output of the Python script
    });
  });
};

