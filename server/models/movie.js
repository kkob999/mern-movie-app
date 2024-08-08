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
    rating : {
        type: Number,
        default: 0
    }
})

const MovieModel = model('Movie', MovieSchema)
module.exports = MovieModel