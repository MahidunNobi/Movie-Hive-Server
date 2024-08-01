"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makedMovieFeatured = void 0;
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
const mongodb_1 = require("mongodb");
const makedMovieFeatured = async (req, res) => {
    const params = req.params;
    const { id } = params;
    try {
        const movie = await MovieModel_1.default.findByIdAndUpdate(new mongodb_1.ObjectId(id), {
            featured: true,
        });
        return res.send({
            message: "Made movie featured successfully!",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
        res.send({ message: "There was an error", error });
    }
};
exports.makedMovieFeatured = makedMovieFeatured;
