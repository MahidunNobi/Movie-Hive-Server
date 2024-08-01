"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovie = exports.getUserMovie = exports.postMovie = exports.getNotFeaturedMovies = exports.getFeaturedMovies = exports.getAllMovies = void 0;
const UserModel_1 = __importDefault(require("../../Models/UserModel"));
const MovieModel_1 = __importDefault(require("../../Models/MovieModel"));
const mongodb_1 = require("mongodb");
const getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel_1.default.find().populate("movie_geners").populate("user");
        return res.send(movies);
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.getAllMovies = getAllMovies;
const getFeaturedMovies = async (req, res) => {
    try {
        const movies = await MovieModel_1.default.find({ featured: true })
            .populate("movie_geners")
            .populate("user");
        return res.send(movies);
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.getFeaturedMovies = getFeaturedMovies;
const getNotFeaturedMovies = async (req, res) => {
    try {
        const movies = await MovieModel_1.default.find({
            $or: [{ featured: { $exists: false } }, { featured: false }],
        })
            .populate("movie_geners")
            .populate("user");
        return res.send(movies);
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.getNotFeaturedMovies = getNotFeaturedMovies;
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
const getMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieModel_1.default.findById(new mongodb_1.ObjectId(id))
            .populate("movie_geners")
            .populate("user");
        res.send(movie);
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.getMovie = getMovie;
const updateMovie = async (req, res) => {
    const reqBody = req.body;
    const { id } = req.params;
    const user = req.user;
    // const loggedInUser = await User.findOne({ email: user?.email });
    const genersId = reqBody.movie_geners.map((gener) => new mongodb_1.ObjectId(gener._id));
    const movieObj = {
        ...reqBody,
        movie_geners: genersId,
        user: reqBody.user,
    };
    const movie = await MovieModel_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(id), movieObj);
    return res.send({ message: "Movie updated successfully", success: true });
};
exports.updateMovie = updateMovie;
const deleteMovie = async (req, res) => {
    const { id } = req.params;
    // Getting the user
    const userReqObj = req.user;
    if (!userReqObj?.email) {
        return res.status(401).send({ message: "Unauthenticated" });
    }
    const user = await UserModel_1.default.findOne({ email: userReqObj.email });
    const movie = await MovieModel_1.default.findById(new mongodb_1.ObjectId(id));
    if (user?._id?.toString() == movie?.user?.toString()) {
        const deleteRes = await movie?.deleteOne();
        if (deleteRes &&
            "deletedCount" in deleteRes &&
            deleteRes.deletedCount > 0) {
            return res.send({ message: "Movie deleted successfully", success: true });
        }
        else {
            return res.send({
                message: "Failed to deleted the movie",
                success: false,
            });
        }
    }
    return res.send({
        message: "Sorry you're not the author of this post",
        success: false,
    });
};
exports.deleteMovie = deleteMovie;
