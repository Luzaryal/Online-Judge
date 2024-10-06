import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import your routes and logic
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import problemRoutes from './routes/problem.route.js';
import { generateFile } from '../Compiler/generateFile.js';
import { executeCpp } from '../Compiler/executeCpp.js';
import { executePython } from '../Compiler/executePython.js';
// Add other execution functions as necessary

dotenv.config();

const PORT = 8080; 
const app = express();

mongoose.connect(process.env.MONGO)
    .then(() => console.log('MongoDB Connection Established'))
    .catch((err) => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for code execution
app.post("/run", async (req, res) => {
    const { language = "cpp", code, input = "" } = req.body;  // Ensure input is optional

    if (!code) {
        return res.status(400).json({ success: false, error: "Empty Code Body!" });
    }

    try {
        const filePath = generateFile(language, code, input); // Generate file
        let output;

        switch (language) {
            case "cpp":
                output = await executeCpp(filePath.codeFilePath, filePath.inputFilePath);  // Pass input if available
                break;
            case "py":
                output = await executePython(filePath.codeFilePath, filePath.inputFilePath);
                break;
            // Add more cases for other languages
            default:
                return res.status(400).json({ success: false, error: "Unsupported language!" });
        }

        res.json({ success: true, output });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Routes for second server (User, Auth, and Problem routes)
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/problem', problemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}!`);
});
