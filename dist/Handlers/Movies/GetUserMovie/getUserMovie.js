"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserMovie = void 0;
const UserModel_1 = __importDefault(require("../../../Models/UserModel"));
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
const getUserMovie = async (req, res) => {
    const userObj = req.user;
    const user = await UserModel_1.default.findOne({ email: userObj?.email });
    const movies = await MovieModel_1.default.find({ user: user?._id }).populate("movie_geners");
    res.send({ Message: "Successfull", data: movies });
};
exports.getUserMovie = getUserMovie;
