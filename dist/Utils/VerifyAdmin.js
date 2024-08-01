"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const verifyAdmin = async (req, res, next) => {
    const user = req.user;
    if (!user)
        return res.status(400).json({ message: "User not found" });
    const dbUser = await UserModel_1.default.findOne({ email: user.email });
    if (dbUser?.role === "ADMIN") {
        return next();
    }
    return res.status(401).send({ message: "Unauthorized" });
};
exports.verifyAdmin = verifyAdmin;
