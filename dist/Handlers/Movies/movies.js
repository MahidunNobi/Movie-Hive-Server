"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMovie = exports.postMovie = void 0;
const UserModel_1 = __importDefault(require("../../Models/UserModel"));
const MovieModel_1 = __importDefault(require("../../Models/MovieModel"));
const mongodb_1 = require("mongodb");
const postMovie = async (req, res) => {
    const reqBody = req.body;
    const user = req.user;
    const loggedInUser = await UserModel_1.default.findOne({ email: user?.email });
    const genersId = reqBody.movie_geners.map((gener) => new mongodb_1.ObjectId(gener._id));
    const movie = new MovieModel_1.default({
        ...reqBody,
        movie_geners: genersId,
        user: loggedInUser?._id,
    });
    await movie.save();
    return res.send({ message: "Movie added successfully", success: true });
};
exports.postMovie = postMovie;
const getUserMovie = async (req, res) => {
    const userObj = req.user;
    const user = await UserModel_1.default.findOne({ email: userObj?.email });
    const movies = await MovieModel_1.default.find({ user: user?._id }).populate("movie_geners");
    res.send({ Message: "Successfull", data: movies });
};
exports.getUserMovie = getUserMovie;
