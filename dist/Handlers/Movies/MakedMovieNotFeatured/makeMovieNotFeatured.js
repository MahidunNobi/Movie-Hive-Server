"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makedMovieNotFeatured = void 0;
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
const mongodb_1 = require("mongodb");
const makedMovieNotFeatured = async (req, res) => {
    const params = req.params;
    const { id } = params;
    try {
        const movie = await MovieModel_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(id), {
            featured: false,
        });
        return res.send({
            message: "Removed movie from featured list",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.makedMovieNotFeatured = makedMovieNotFeatured;
