const mongoose = require('mongoose')
const {Schema, model} = mongoose

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genres: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        
    }
})

const MovieModel = model('Movie', MovieSchema)
module.exports = MovieModel