const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Limiter = require("express-rate-limit");
const cors = require("cors");
const { mongoose } = require("./db.js"); //db connection
var photographerRoutes = require("./routes/photographers-routes");
var userRoutes = require("./routes/users-routes");
var photographerScrapeRoutes = require("./routes/scraper-routes");

const limiterRegister = Limiter({
  // 20 minutes
  windowMs: 20 * 60 * 1000,
  // max 10000 requests
  max: 10000,
});


const app = express();
app.use(limiterRegister);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:27017"],
    methods: "GET, POST, PATCH, PUT, DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("api/scrapes",photographerScrapeRoutes);
app.use("/api/photographer", photographerRoutes);
app.use("/api/user", userRoutes);
app.use("/api", (req, res) => {
  res.send("Server stared");
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  } else {
    res.status(error.code || 500);
    res.json({ message: error.message || "An unknown error occurred!" });
  }
});

module.exports = app;
