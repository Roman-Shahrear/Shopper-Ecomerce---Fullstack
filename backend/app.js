const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Route Imports
const product = require("./routes/productRoutes");

app.use("/api/v1", product);


//Error middleware
const errorMiddleware = require("./middleware/error");

// config
dotenv.config({path:"backend/config/config.env"});

//Image Storage Engine configure
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename:(req, file, cb)=> {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

//For Use multer
const upload = multer({storage:storage});

//Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res)=>{
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`
    });
});


app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Express app is runing");
})

module.exports = app;