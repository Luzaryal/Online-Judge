import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

// To replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes"); // Directory to store code files
const dirInputs = path.join(__dirname, "inputs"); // Directory to store input files

// Ensure the directories exist

// Generate files for code and user input
export const generateFile = (language, code, input = "") => {
  if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
  }
  
  if (!fs.existsSync(dirInputs)) {
    fs.mkdirSync(dirInputs, { recursive: true });
  }
  
  const jobId = uuid(); // Unique job identifier
  const codeFilename = `${jobId}.${language}`; // Create filename based on the language
  const codeFilePath = path.join(dirCodes, codeFilename); // Full path for code file

  const inputFilename = `${jobId}.txt`; // Store input in a .txt file
  const inputFilePath = path.join(dirInputs, inputFilename); // Full path for input file

  // Write code to file
  fs.writeFileSync(codeFilePath, code);

  // Write input to file only if input is provided
  if (input) {
    fs.writeFileSync(inputFilePath, input);
  }

  // Return both file paths, input might be undefined if no input is provided
  return { codeFilePath, inputFilePath: input ? inputFilePath : undefined };
};
