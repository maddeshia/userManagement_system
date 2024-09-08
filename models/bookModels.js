const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    favoriatBook:{
        type:String,
        required:true
    },
    tittle:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    isbn_number:{
        type:Number,
        required:true
    },
    
},{timestamps:true});


const book = new mongoose.model("Book",bookSchema);

module.exports = book;