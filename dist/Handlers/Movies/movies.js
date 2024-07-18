"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMovie = void 0;
const UserModel_1 = __importDefault(require("../../Models/UserModel"));
const MovieModel_1 = __importDefault(require("../../Models/MovieModel"));
const postMovie = async (req, res) => {
    const reqBody = req.body;
    const user = req.user;
    const loggedInUser = await UserModel_1.default.findOne({ email: user?.email });
    const movie = new MovieModel_1.default({ ...reqBody, user: loggedInUser?._id });
    await movie.save();
    return res.send({ message: "Movie added successfully", success: true });
};
exports.postMovie = postMovie;
