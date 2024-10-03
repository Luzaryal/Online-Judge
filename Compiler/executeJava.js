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

export const executeJava = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];  // This is the base name of the Java file without extension
  const outPath = path.join(outputPath, jobId);  // Output path for .class files

  return new Promise((resolve, reject) => {
    // Compile Java file using javac
    exec(
      `javac ${filepath} -d ${outputPath} && cd ${outputPath} && java ${jobId}`,
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
  });
};


