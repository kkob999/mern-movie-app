const express = require('express')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Movie = require('./models/movie')

app.use(cors({credentials: true, origin: "http://localhost:3000/"}))
app.use(bodyParser.json())
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://kobruji:eUoREhSXKuQ2cCLW@movies.gavlg.mongodb.net/?retryWrites=true&w=majority&appName=Movies')

app.get("/", (req,res) => {
    res.send("Hello, test")
})

app.post("/movie", async(req,res) => {
    const movie = new Movie({
        ...req.body
    })

    console.log(req.body)

    try{
        await movie.save()
        res.status(201).send(movie)
    }catch(e){
        res.status(400).send(e)
    }
})

app.listen(4000)

//
