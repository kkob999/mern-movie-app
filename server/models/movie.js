const mongoose = require('mongoose')
const {Schema, model} = mongoose

const MovieSchema = new Schema({
    title: {
        type: String,
        required: true,
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
    },
    reviewer : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const MovieModel = model('Movie', MovieSchema)
module.exports = MovieModel