const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());


//Error middleware
const errorMiddleware = require("./middleware/error");

// config
dotenv.config({path:"backend/config/config.env"});


app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Express app is runing");
})

module.exports = app;