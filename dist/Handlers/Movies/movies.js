"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postMovie = void 0;
const postMovie = async (req, res) => {
    const movie = req.body;
    const cookie = req.cookies;
    console.log(cookie);
    return res.send({ message: "Movie added successfully", success: true });
};
exports.postMovie = postMovie;
