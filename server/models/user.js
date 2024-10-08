const mongoose = require('mongoose')
const {Schema,model} = mongoose

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 7
    }
})

UserSchema.virtual('movie', {
    ref: 'Movie',
    localField: '_id',
    foreignField: 'reviewer'
})

const UserModel = model('User', UserSchema)

module.exports = UserModel