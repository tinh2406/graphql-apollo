const express = require('express')
const { ApolloServer } = require("apollo-server-express")
const typeDefs = require("./schema/schema")
const resolvers = require( "./resolver/resolver")
const mongoose = require('mongoose')


const main = async ()=>{
    const connectDB = async()=>{
        mongoose.set('strictQuery', false)
        try {
            await mongoose.connect('mongodb+srv://books:books@cluster0.btnng2i.mongodb.net/?retryWrites=true&w=majority')
            console.log("MongoDb connected")
        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })
    await connectDB()
    const app = express()
    await server.start()
    server.applyMiddleware({app})
    app.listen({port:4000},()=>{
        console.log(`Server started at http://localhost:4000${server.graphqlPath}`)
    })
}
main()