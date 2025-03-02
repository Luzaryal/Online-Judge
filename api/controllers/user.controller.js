import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({message: "API is Working!"});
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are Not Allowed to Update This User'));
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password Must be Atleast 6 Characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username Must be Between 7 and 20 Characters'));
        }

        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username Cannot Contain Spaces'));
        }

        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username Must be Lowercase'));
        }

        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username Can Only Contain Letters and Numbers'));
        }
    }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.userId ,{
                $set: {
                    username: req.body.username,
                    email:  req.body.email,
                    profilePicture:  req.body.profilePicture,
                    password: req.body.password,
                },
            }, {new: true});      // Send Back the New Information
            const { password, ...rest } = updatedUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are Not Allowed to Delete This User'));
    }

    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User Has Been Deleted');

    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token').status(200).json('User Has Been Signed Out');
    } catch (error) {
        next(error);
    }
}

export const solveProblem = async (req, res, next) => {
    try {
        await User.updateOne(
            { _id: req.params.userId },
            { $addToSet: { solvedProblems: req.body.problemSlug } }
        );
        res.status(200).json('Problem is solved!');
    } catch (error) {
        next(error);
    }
};
