import Problem from "../models/problem.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You Are Now Allowed To Create a Problem Statement'));
    }
    if (!req.body.title || !req.body.difficulty || !req.body.description || !req.body.inputformat || !req.body.outputformat || !req.body.input || !req.body.inputvalue || !req.body.output || !req.body.explanation) {
        return next(errorHandler(400, 'Please Provide All The Fields'));
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newProblem = new Problem({
        ...req.body, 
        slug, 
        userId: req.user.id
    });
    try {
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        next(error);
    }
};