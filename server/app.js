require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const port = process.env.PORT || 4000;
const auth = require("./src/routes/auth.routes");
const passport = require("./config/passportjs/passport.config");
const session=require("express-session");
const morgan=require("morgan");
const { verifyToken } = require("./src/middlewares/tokens.middleware");
const http=require("http");
const server=http.createServer(app);
const chats=require('./src/routes/chats.routes');
const errorHandler=require("./src/middlewares/errorHandler.middleware");
app.use(morgan('tiny'))
const cookieParser = require("cookie-parser");
const setHeaders = require("./src/middlewares/setHeaders.middleware");
const socketio = require("./config/socker.io/socketio.config");
app.use(
  cors({
    origin: ["http://localhost:3000","http://192.168.154.27:3000"],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials:true,
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
app.use(passport.session());
app.use(setHeaders);

app.use("/auth", auth);
app.use(verifyToken)
app.use("/chats",chats);
app.use(errorHandler);

socketio(server);
server.listen(4000, () => {
  console.log(`Server running at port: ${port}`);
}); 
module.exports=server;