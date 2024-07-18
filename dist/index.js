"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./Routers/users"));
const movies_1 = __importDefault(require("./Routers/movies"));
const geners_1 = __importDefault(require("./Routers/geners"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
dotenv_1.default.config();
// middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send("Movie hive server is running here...");
});
const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};
// Routes
app.use("/users", users_1.default);
app.use("/movies", movies_1.default);
app.use("/geners", geners_1.default);
// Authentication JWT and LOGOUT
app.post("/jwt", async (req, res) => {
    const user = req.body;
    const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1hr",
    });
    res.cookie("movie_token", token, cookieOption).send({ success: true });
});
app.get("/logout", (req, res) => {
    res.clearCookie("movie_token", { ...cookieOption, maxAge: 0 }).send({
        success: true,
    });
});
// Connect function to DB
const connect = async () => {
    try {
        await mongoose_1.default.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cxk7yn6.mongodb.net/Movie-Hive?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected with database successfully!");
    }
    catch (error) {
        console.log(error);
    }
};
app.listen(port, async () => {
    await connect();
    console.log("Server started successfully.");
});
