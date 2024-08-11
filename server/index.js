const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Movie = require("./models/movie");
const User = require("./models/user");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(express.urlencoded({ extended: true }));

const salt = bcrypt.genSaltSync(10);
const secret = "thisismysecret";

mongoose.connect(
  "mongodb+srv://kobruji:eUoREhSXKuQ2cCLW@movies.gavlg.mongodb.net/?retryWrites=true&w=majority&appName=Movies"
);

app.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("reviewer").exec();
    const moviesWithReviewCount = await Promise.all(
      movies.map(async (movie) => {
        const reviewCount = await Movie.countDocuments({ title: movie.title });
        return { ...movie.toObject(), reviewCount };
      })
    );

    res.json(moviesWithReviewCount);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/movie/:id", async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).send();
    }

    res.send(movie);
  } catch (e) {
    res.status(500).send();
  }
});

app.post("/movie", uploadMiddleware.single("file"), async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).send("Unauthorized: No token provided.");
  }

  jwt.verify(token, secret, {}, async (err, userInfo) => {
    if (err) {
      return res.status(401).send("Unauthorized: Invalid token.");
    }

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
      reviewer: userInfo.id,
    });

    try {

      await movie.save();
      res.status(201).send(movie);
    } catch (e) {
      res.status(400).send(e);
    }
  });
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = new User({
    username,
    password: bcrypt.hashSync(password, salt),
  });

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  //   console.log(user)
  if (user && bcrypt.compareSync(password, user.password)) {
    jwt.sign(
      { username, id: user._id },
      secret,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Error signing token");
        }
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          })
          .json({ id: user._id, username });
      }
    );
  } else {
    res.status(400).send("Wrong credentials");
  }
});

app.get("/user", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok");
});

app.listen(4000);
