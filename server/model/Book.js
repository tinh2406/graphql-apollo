const { Schema, default: mongoose } = require("mongoose");

const BookSchema = new Schema({
    name:{
        type:String
    },
    genre:{
        type:String
    },
    authorId:{
        type:String
    }
})

module.exports = mongoose.model('book',BookSchema)