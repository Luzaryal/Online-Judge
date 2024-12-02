import Problem from "../models/problem.model.js";

import { generateFile } from '../../Compiler/generateFile.js';
import { executeCpp } from '../../Compiler/executeCpp.js';
import { executePython } from '../../Compiler/executePython.js';
import { executeJava } from '../../Compiler/executeJava.js';
import { executeGo } from '../../Compiler/executeGo.js';
import { executeJavaScript } from '../../Compiler/executeJavaScript.js';

export const runAll = async (req, res) => {
    const { userId, language, code, problemId } = req.body;

    if (!code || !problemId) {
        return res.status(400).json({ success: false, error: "Code and problem ID are required!" });
    }

    try {
        // Fetch the problem from the database
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ success: false, error: "Problem not found!" });
        }

        // Prepare to test against the test cases
        const testCases = problem.testCases;
        const results = [];

        // Generate the code file
        const filePath = generateFile(language, code);

        for (const testCase of testCases) {
            // Create input file for the test case
            await fs.promises.writeFile(filePath.inputFilePath, testCase.input);

            // Execute the user's code
            let output;
            switch (language) {
                case "cpp":
                    output = await executeCpp(filePath.codeFilePath, filePath.inputFilePath);
                    break;
                case "py":
                    output = await executePython(filePath.codeFilePath, filePath.inputFilePath);
                    break;
                case "java":
                    output = await executeJava(filePath.codeFilePath, filePath.inputFilePath);
                    break;
                case "go":
                    output = await executeGo(filePath.codeFilePath, filePath.inputFilePath);
                    break;
                case "js":
                    output = await executeJavaScript(filePath.codeFilePath, filePath.inputFilePath);
                    break;
                default:
                    throw new Error("Unsupported language!");
            }

            // Compare the output with the expected output
            const isPassed = output.trim() === testCase.output.trim();
            results.push({
                input: testCase.input,
                expected: testCase.output,
                output,
                passed: isPassed,
                explanation: testCase.explanation,
            });
        }

        // Send the results back to the user
        res.json({ success: true, results });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


