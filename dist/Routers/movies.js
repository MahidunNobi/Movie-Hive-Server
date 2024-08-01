"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const VerifyToken_1 = require("../Utils/VerifyToken");
const VerifyAdmin_1 = require("../Utils/VerifyAdmin");
const getAllMovies_1 = require("../Handlers/Movies/GetAllMovies/getAllMovies");
const getFeaturedMovies_1 = require("../Handlers/Movies/GetFeaturedMovies/getFeaturedMovies");
const getNotFeaturedMovies_1 = require("../Handlers/Movies/GetNotFeauredMovies/getNotFeaturedMovies");
const postMovie_1 = require("../Handlers/Movies/PostMovie/postMovie");
const updateMovie_1 = require("../Handlers/Movies/UpdateMovie/updateMovie");
const deleteMovie_1 = require("../Handlers/Movies/DeleteMovie/deleteMovie");
const getUserMovie_1 = require("../Handlers/Movies/GetUserMovie/getUserMovie");
const getMovie_1 = require("../Handlers/Movies/GetMovie/getMovie");
const makedMovieFeatured_1 = require("../Handlers/Movies/MakedMovieFeatured/makedMovieFeatured");
const makeMovieNotFeatured_1 = require("../Handlers/Movies/MakedMovieNotFeatured/makeMovieNotFeatured");
const movieRouter = (0, express_1.Router)();
movieRouter.get("/", getAllMovies_1.getAllMovies);
movieRouter.get("/featured", getFeaturedMovies_1.getFeaturedMovies);
movieRouter.get("/not-featured", getNotFeaturedMovies_1.getNotFeaturedMovies);
movieRouter.post("/", VerifyToken_1.verifyToken, postMovie_1.postMovie);
movieRouter.patch("/:id", VerifyToken_1.verifyToken, updateMovie_1.updateMovie);
movieRouter.delete("/:id", VerifyToken_1.verifyToken, deleteMovie_1.deleteMovie);
movieRouter.get("/user", VerifyToken_1.verifyToken, getUserMovie_1.getUserMovie);
movieRouter.get("/:id", VerifyToken_1.verifyToken, getMovie_1.getMovie);
// Admin Routes
movieRouter.post("/featured/:id", VerifyToken_1.verifyToken, VerifyAdmin_1.verifyAdmin, makedMovieFeatured_1.makedMovieFeatured);
movieRouter.post("/not-featured/:id", VerifyToken_1.verifyToken, VerifyAdmin_1.verifyAdmin, makeMovieNotFeatured_1.makedMovieNotFeatured);
exports.default = movieRouter;
