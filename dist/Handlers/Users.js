"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.saveUser = void 0;
const UserModel_1 = __importDefault(require("../Models/UserModel"));
const saveUser = async (req, res) => {
    const reqBody = req.body;
    // Checking if user already exists
    const userExists = await UserModel_1.default.findOne({ email: reqBody.email });
    if (userExists) {
        return res.send({ message: "User already exists" });
    }
    // If user does not exists than create one
    const userInfo = {
        email: reqBody.email,
        displayName: reqBody.displayName || "",
        photoURL: reqBody.photoURL || "",
        role: "USER",
    };
    const user = new UserModel_1.default(userInfo);
    const saveUserREs = await user.save();
    return res.send(saveUserREs);
};
exports.saveUser = saveUser;
const getUser = async (req, res) => {
    const { email } = req.params;
    try {
        const UserRes = await UserModel_1.default.findOne({ email });
        return res.json(UserRes);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "There was an error", error });
    }
};
exports.getUser = getUser;
