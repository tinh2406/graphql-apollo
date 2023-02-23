const { Schema, default: mongoose } = require("mongoose");

const AuthorSchema = new Schema({
    name:{
        type:String
    },
    age:{
        type:Number
    }
})
module.exports = mongoose.model('author',AuthorSchema)