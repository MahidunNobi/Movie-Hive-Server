"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = require("../Handlers/Movies/movies");
const VerifyToken_1 = require("../Utils/VerifyToken");
const movieRouter = (0, express_1.Router)();
movieRouter.post("/", VerifyToken_1.verifyToken, movies_1.postMovie);
movieRouter.get("/user", VerifyToken_1.verifyToken, movies_1.getUserMovie);
exports.default = movieRouter;
