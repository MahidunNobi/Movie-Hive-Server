"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovie = void 0;
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
const mongodb_1 = require("mongodb");
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
