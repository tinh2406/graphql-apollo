const data = require("../data/dp")
const Author = require("../model/Author")
const Book = require("../model/Book")

const resolvers = {
    Query:{
        books:async()=>await data.getAllBooks(),
        authors:async()=>await data.getAllAuthors(),
        book:async(parent,args)=>await data.getBookById(args.id),
        author:async(parent,args)=>await data.getAuthorById(args.id)
    },
    Book:{
        author:async(parent,args)=>{
            
            return await data.getAuthorById(parent.authorId)}
    },
    Author:{
        books:async(parent,args)=>await data.getBooksByAuthorId(parent.id)
    },
    Mutation:{
        createAuthor:async (parent,args)=>{
            const newAuthor = new Author(args)
            return await newAuthor.save()
        },
        createBook:async(parent,args)=>{
            const newBook = new Book(args)
            return await newBook.save()
        }
    }
}
module.exports = resolvers