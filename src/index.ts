import express, { CookieOptions } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
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

app.get("/", (req, res) => {
  res.send("Movie hive server is running here...");
});

const cookieOption : CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
};

// Authentication JWT and LOGOUT
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, "sdf4#4fdsa%$@*+65*213*5&948&", {
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


app.listen(port, () => {
  console.log("Server started successfully.");
});
