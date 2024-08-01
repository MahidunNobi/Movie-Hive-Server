"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovie = void 0;
const mongodb_1 = require("mongodb");
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
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
