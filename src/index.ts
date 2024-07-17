import express, { CookieOptions } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./Routers/users";
import movieRouter from "./Routers/movies";


const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Movie hive server is running here...");
});

const cookieOption : CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// Routes
app.use("/users", userRouter)
app.use("/movies", movieRouter)

// Authentication JWT and LOGOUT
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.JWT_SECRET as string, {
    expiresIn: "1hr",
  });
  res
    .cookie("movie_token", token, cookieOption)
    .send({ success: true });
});

app.get("/logout", (req, res)=>{
    res
    .clearCookie("movie_token", {...cookieOption, maxAge: 0})
    .send({
        success: true
    })
}) 


// Connect function to DB
const connect = async() =>{
  try {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.cxk7yn6.mongodb.net/Movie-Hive?retryWrites=true&w=majority&appName=Cluster0`)
    console.log("Connected with database successfully!")
  } catch (error) {
    console.log(error)
  }
}

app.listen(port, async() => {
  await connect()
  console.log("Server started successfully.");
});
