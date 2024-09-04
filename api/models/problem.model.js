import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
    },
    title: {
        type: String, 
        required: true,
        unique:  true,
    },
    difficulty: {
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
    input: {
        type: String, 
        required: true,
    },
    inputvalue: {
        type: String, 
        required: true,
    },
    output: {
        type: String, 
        required: true,
    },
    explanation: {
        type: String, 
        required: true,
    },
    slug: {
        type: String, 
        required: true,
        unique: true,
    },

}, {timestamps: true}
);

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;