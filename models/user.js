const mongoose = require('mongoose')
const uniValid = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type: String, require:true, unique: true},
    password: {type: String, require:true},
    pseudo: {type: String, require:true, unique: true},
})

userSchema.plugin(uniValid)

module.exports = mongoose.model('User', userSchema)