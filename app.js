const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

//Load schema & resolvers
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

//Load db methods
const mongoDataMethods = require('./data/db')

//Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://leminhnghia:1234@tutorialgraphql.airkevq.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB Connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ mongoDataMethods })
})

const app = express()
server.start().then((res) => {
    server.applyMiddleware({ app });

    app.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
});