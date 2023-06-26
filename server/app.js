require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 4000;
const auth = require("./src/routes/auth");
const passport = require("./src/passport");
const session=require("express-session");
const { verifyToken } = require("./src/middlewares/tokens");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
}))
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session())
app.get("/", (req, res) => {
    try {
        res.status(200).send({ msg: "Hello Server" });
    } catch (err) {
        console.log(err);
    }
});
app.use("/auth", auth);
app.listen(4000, () => {
  console.log(`Server running at port: ${port}`);
});
