import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';
import { fileURLToPath } from 'url';

// To replace __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dirCodes = path.join(__dirname, "codes"); // Use __dirname-like logic for ES modules

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

export const generateFile = (language, code) => {
  const jobId = uuid();
  const filename = `${jobId}.${language}`;
  const filePath = path.join(dirCodes, filename); 

  fs.writeFileSync(filePath, code);
  return filePath;
};
