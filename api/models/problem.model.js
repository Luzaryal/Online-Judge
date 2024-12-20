import mongoose from "mongoose";

// Define schema for a single test case
const testCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: false,  // Explanation might be optional
    },
});

const problemSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inputformat: {
        type: String,
        required: true,
    },
    outputformat: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    // Remove old input/output fields and replace them with an array of test cases
    testCases: [testCaseSchema],  // Array of test cases
    slug: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;
