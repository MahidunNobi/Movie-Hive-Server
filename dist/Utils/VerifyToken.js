"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies.movie_token;
    if (!token)
        return res.status(401).send({ message: "Unauthenticated!" });
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
            console.log(err);
            return res.status(403).send({ message: "Token verify failled" });
        }
        req.user = decode;
    });
    next();
};
exports.verifyToken = verifyToken;
