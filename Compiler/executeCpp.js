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

export const executeCpp = async (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(outputPath, outputFilename);  // D:\AlgoUOC\Backend\outputs\outputFilename

    return new Promise((resolve, reject) => {
        exec(
          `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${outputFilename}`, 
          (error, stdout, stderr) => {
            if (error) {
              reject (error);
            }
            if (stderr) {
              reject (error);
            }
            resolve(stdout);
          }
        )
    })

};

