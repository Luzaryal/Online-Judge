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

// Export the function using ES module syntax
export const executeGo = async (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];  // Get the base name of the Go file without extension
  const outPath = path.join(outputPath, jobId);  // Output path for the compiled Go executable

  return new Promise((resolve, reject) => {
    // Compile Go file using 'go build' and execute the output binary
    exec(
      `go build -o ${outPath} ${filepath} && ${outPath}`, 
      (error, stdout, stderr) => {
        if (error) {
          return reject(error);  // Handle compilation error or execution error
        }
        if (stderr) {
          return reject(stderr);  // Handle runtime errors (stderr)
        }
        resolve(stdout);  // Return the standard output (stdout)
      }
    );
  });
};
