import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// To simulate __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(__dirname, "outputs"); // Define the output folder

// Ensure the outputs directory exists

export const executeCpp = (filePath, inputFilePath) => {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }
  
  const jobId = path.basename(filePath).split('.')[0]; // Extract jobId from file name
  const outputFilePath = path.join(outputPath, `${jobId}.exe`); // Output file path


  return new Promise((resolve, reject) => {
    // Command to compile the C++ file
    const compileCommand = `g++ ${filePath} -o ${outputFilePath}`;

    exec(compileCommand, (compileError, stdout, stderr) => {
      if (compileError) {
        reject({ error: stderr });
      } else {
        // Command to execute the compiled file
        const executeCommand = inputFilePath
          ? `${outputFilePath} < ${inputFilePath}`
          : `${outputFilePath}`;

        exec(executeCommand, (executeError, executeStdout, executeStderr) => {
          if (executeError) {
            reject({ error: executeStderr });
          } else {
            resolve(executeStdout);
          }
        });
      }
    });
  });
};
