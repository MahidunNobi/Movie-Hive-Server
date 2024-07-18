"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const geners_1 = require("../Handlers/Geners/geners");
const genersRouter = (0, express_1.Router)();
genersRouter.get("/", geners_1.getGeners);
exports.default = genersRouter;
