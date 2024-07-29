"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../Handlers/Users");
const VerifyToken_1 = require("../Utils/VerifyToken");
const userRouter = express_1.default.Router();
userRouter.post("/", Users_1.saveUser);
userRouter.get("/:email", VerifyToken_1.verifyToken, Users_1.getUser);
exports.default = userRouter;
