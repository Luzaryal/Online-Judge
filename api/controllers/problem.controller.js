import Problem from "../models/problem.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {

    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You Are Now Allowed To Create a Problem Statement'));
    }
    // if (!req.body.title || !req.body.difficulty || !req.body.description || !req.body.inputformat || !req.body.outputformat || !req.body.input || !req.body.inputvalue || !req.body.output || !req.body.explanation) {
    //     console.log("here");
    //     return next(errorHandler(400, 'Please Provide All The Fields'));
    // }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
   
    try {
        const newProblem = new Problem({
            ...req.body, 
            slug, 
            userId: req.user.id
        });
        const savedProblem = await newProblem.save();
        res.status(201).json(savedProblem);
    } catch (error) {
        next(error);
    }
};

export const getProblems = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const problems = await Problem.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.problemId && {_id: req.query.problemId}),
            ...(req.query.searchTerm &&{
                $or: [
                   { title: { $regex: req.query.searchTerm, $options: 'i' } },
                   { description: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
            }),

        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalProblems = await Problem.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthProblems = await Problem.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });

        res.status(200).json({
            problems,
            totalProblems,
            lastMonthProblems,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteproblem = async (req, res, next) => {

    if(!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You Are Not Allowed to Delete this Post'));
    }

    try {
        await Problem.findByIdAndDelete(req.params.problemId);
        res.status(200).json('The Post has been Deleted');
    } catch (error) {
        next(error);
    }
}
export const updateproblem = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You Are Not Allowed to Update this Problem'));
    }
    try {
      const updatedProblem = await Problem.findByIdAndUpdate(
        req.params.problemId,
        {
          $set: {
            title: req.body.title,
            difficulty: req.body.difficulty,
            category: req.body.category,
            description: req.body.description,
            inputformat: req.body.inputformat,
            outputformat: req.body.outputformat,
            testCases: req.body.testCases, // Replaces the entire array of test cases
          },
        },
        { new: true }
      );
  
      res.status(200).json(updatedProblem);
    } catch (error) {
      next(error);
    }
  };
  