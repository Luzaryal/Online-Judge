import Problem from "../models/problem.model.js";
import User from "../models/user.model.js";

export const getUserScores = async (req, res, next) => {
  try {
    const users = await User.find().populate('solvedProblems', 'slug');
    const problems = await Problem.find();

    const problemScores = {};
    problems.forEach(problem => {
      problemScores[problem.slug] = problem.score;
    });

    const userScores = {};
    users.forEach(user => {
      let totalScore = 0;
      user.solvedProblems.forEach(solvedProblem => {
        const score = problemScores[solvedProblem];
        if (score) {
          totalScore += score;
        }
      });
      userScores[user.username] = totalScore;
    });

    return res.status(200).json(userScores);
  } catch (err) {
    console.error('Error fetching user scores:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
