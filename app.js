require("dotenv").config({ path: './.env' });
const express = require("express");
const app = express();
const cors = require("cors");

// db connection
require("./models/database").connectDatabase();

app.use(cors({ credentials: true, origin: true }));

// route info logger
const logger = require("morgan");
// message tiny minimal info
app.use(logger("tiny"));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// sessions and cookies
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
    // cookie: { maxAge: 3600000 } // 1 hour
}));

app.use(cookieparser());

// express file-upload
const fileupload = require("express-fileupload");
app.use(fileupload());


// routes
app.use('/', require("./routes/indexRoutes"));
app.use('/resume', require("./routes/resumeRoutes.js"));
app.use('/employe', require("./routes/employeRoutes.js"));




// error handling
// supportive functions and middleware
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/error");
// // * selects all routes
app.all("*", (req, res, next) => {
    next(new ErrorHandler(`Requested Url Not Found ${req.url} `, 404))
});
app.use(generatedErrors);

app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT || 8080}`));