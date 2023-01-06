const mongoose = require("mongoose");
const express = require("express");
const cookieSession = require("cookie-session");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const cors = require("cors");
const passportSetup = require("./controllers/users/passport");
const morgan = require("morgan");
const userRoutes = require("./routes/users/userRoutes");
const { notFound, errorHandler } = require("./middleware/error/errorHandler");
const uploadRouter = require("./middleware/upload/uploadMain");
const postRoutes = require("./routes/posts/postRoutes");
const commentRoutes = require("./routes/comments/commentRoutes");
const categoryRoutes = require("./routes/categories/categoryRoutes");
const settingsRoutes = require("./routes/settings/settingRoutes");
const subscriberRoutes = require("./routes/subscribers/subRoutes");
const adsRoutes = require("./routes/ads/adsRoutes");

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//Cookies section
app.use(
  session({
    secret: "somethingsecretgoeshere",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,OPTIONS,POST,PUT,PATCH",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Users Routes
app.use("/api/users", userRoutes);

//Posts Routes
app.use("/api/posts", postRoutes);

//Category Routes
app.use("/api/category", categoryRoutes);

//Comments Routes
app.use("/api/comments", commentRoutes);

//Subscriber Routes
app.use("/api/subscribe", subscriberRoutes);

//Settings Routes
app.use("/api/settings", settingsRoutes);

//Ads Routes
app.use("/api/ads", adsRoutes);

//Upload Routes
app.use("/api/upload", uploadRouter);

//Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`serve at http://localhost:${PORT}`));
