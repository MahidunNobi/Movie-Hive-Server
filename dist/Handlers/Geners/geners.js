"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeners = void 0;
const Geners_1 = __importDefault(require("../../Models/Geners"));
const getGeners = async (req, res) => {
    const genersRes = await Geners_1.default.find();
    return res.send(genersRes);
};
exports.getGeners = getGeners;
