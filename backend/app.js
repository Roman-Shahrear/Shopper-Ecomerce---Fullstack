const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const product = require("./routes/productRoutes");
const user = require("./routes/userRoutes");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

//config
dotenv.config({path:"backend/config/config.env"});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
// CORS configuration
const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

app.use(cors(corsOptions));


app.use("/api/v1", product);
app.use("/api/v1", user);


// ... (other middleware and routes)

const storage = multer.diskStorage({
    destination: path.join(__dirname, "upload/images"),
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

app.use("/images", express.static(path.join(__dirname, "upload/images")));

app.post("/upload", upload.single("product"), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    });
});


// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
