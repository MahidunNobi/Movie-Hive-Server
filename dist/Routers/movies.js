"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const movies_1 = require("../Handlers/Movies/movies");
const VerifyToken_1 = require("../Utils/VerifyToken");
const VerifyAdmin_1 = require("../Utils/VerifyAdmin");
const movieRouter = (0, express_1.Router)();
movieRouter.get("/", movies_1.getAllMovies);
movieRouter.get("/featured", movies_1.getFeaturedMovies);
movieRouter.get("/not-featured", movies_1.getNotFeaturedMovies);
movieRouter.post("/", VerifyToken_1.verifyToken, movies_1.postMovie);
movieRouter.patch("/:id", VerifyToken_1.verifyToken, movies_1.updateMovie);
movieRouter.delete("/:id", VerifyToken_1.verifyToken, movies_1.deleteMovie);
movieRouter.get("/user", VerifyToken_1.verifyToken, movies_1.getUserMovie);
movieRouter.get("/:id", VerifyToken_1.verifyToken, movies_1.getMovie);
// Admin Routes
movieRouter.post("/featured/:id", VerifyToken_1.verifyToken, VerifyAdmin_1.verifyAdmin, movies_1.makedMovieFeatured);
movieRouter.post("/not-featured/:id", VerifyToken_1.verifyToken, VerifyAdmin_1.verifyAdmin, movies_1.makedMovieNotFeatured);
exports.default = movieRouter;
