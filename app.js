/**
 * Setup express
 */
const express = require("express");
// const cookieParser = require("cookie-parser");

/**
 * Setup Morgan
 */
const morgan = require("morgan");
const path = require("path");

/**
 *
 * Use gzip compression
 */
// import compression from 'compression'

/**
 *
 * Use Helmet to setup http headers correctly
 */
// import helmet from 'helmet'

/**
 * Setup body parser
 */
const bodyParser = require("body-parser");

/**
 * Setup CORS
 */
const cors = require("cors");

/**
 * rate limiter
 */
const rateLimit = require("express-rate-limit");

/**
 * Routes
 */
const routes = require("./src/main/routes/index");

const app = express();

app.use(morgan("combined"));
//app.use(cookieParser());

// app.use(compression())

// app.use(helmet())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const corsOptions = {
  // origin: 'http://localhost:4200'
};
app.use(cors(corsOptions));
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 1000,
});

// app.set("views", path.join(__dirname, "./src/main/views"));
// app.set("view engine", "ejs");

// app.get("/upload", (req, res) => {
//   res.render("upload");
// });

app.use("/api/", apiLimiter);

app.use("/api/v1/", routes);

// import etag from 'etag';
// res.setHeader('ETag', etag(body));

module.exports = app;
