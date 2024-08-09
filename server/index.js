const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Movie = require("./models/movie");
const multer = require("multer");

const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000/" }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://kobruji:eUoREhSXKuQ2cCLW@movies.gavlg.mongodb.net/?retryWrites=true&w=majority&appName=Movies"
);

app.get("/", (req, res) => {
  Movie.find({})
    .then((movie) => {
      res.send(movie);
      console.log(movie);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.post("/movie", uploadMiddleware.single("file"), async (req, res) => {

  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, genres, rating } = req.body;
  const movie = new Movie({
    title,
    genres,
    poster: newPath,
    rating,
  });

  try {
    await movie.save();
    res.status(201).send(movie);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(4000);
