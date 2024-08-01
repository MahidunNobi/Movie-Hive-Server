"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = void 0;
const mongodb_1 = require("mongodb");
const UserModel_1 = __importDefault(require("../../../Models/UserModel"));
const MovieModel_1 = __importDefault(require("../../../Models/MovieModel"));
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
