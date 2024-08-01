"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotFeaturedMovies = void 0;
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
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
