"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const generSchema = new mongoose_1.Schema({
    value: String,
    label: String,
});
const Geners = (0, mongoose_1.model)("Geners", generSchema);
exports.default = Geners;
