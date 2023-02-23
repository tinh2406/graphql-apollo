const Author = require("../model/Author");
const Book = require("../model/Book");

const data = {
    getAllBooks:async()=>(await Book.find()),
    getAllAuthors:async()=>(await Author.find()),
    getBookById:async(id)=>(await Book.findById(id)),
    getAuthorById:async(id)=>(await Author.findById(id)),
    getBooksByAuthorId:async(id)=>await Book.find({authorId:id})
}
module.exports = data