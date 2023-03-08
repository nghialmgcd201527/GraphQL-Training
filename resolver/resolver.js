const resolvers = {
    //QUERY
    Query: {
        books: async (parent, args, context) => await context.mongoDataMethods.getAllBooks(), //Cach khac cho "context" o dong 5
        book: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getBookById(args.id), //Cach khac cho args o dong 7
        authors: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllAuthors(),
        author: async (parent, { id }, { mongoDataMethods }) => await mongoDataMethods.getAuthorById(id)
    },
    Book: {
        author: async ({ authorId }, args, { mongoDataMethods }) => await mongoDataMethods.getAuthorById(authorId)
    },
    Author: {
        books: async ({ id }, args, { mongoDataMethods }) => await mongoDataMethods.getAllBooks({ authorId: id })
    },

    //MUTATION
    Mutation: {
        createAuthor: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.createAuthor(parent, args),
        createBook: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.createBook(parent, args)
    }
}

module.exports = resolvers
