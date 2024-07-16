"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Users_1 = require("../Handlers/Users");
const userRouter = express_1.default.Router();
userRouter.post("/", Users_1.saveUser);
exports.default = userRouter;
