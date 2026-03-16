const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author || !args.genre) {
        return Book.find({}).populate('author')
      } else if (args.author && args.genre) {
        return Book.find({ author: args.author, genres: args.genre}).populate('author')
      } else if (args.author) {
        return Book.find({ author: args.author }).populate('author')
      } else {
        return Book.find({ genres: args.genre }).populate('author')
      }
    },
    allAuthors: async () => Author.find({}),
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    }
  },

  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author
        })
        await author.save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author._id
      })
      
      return book.save()
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      return author.save()
    }
  }
}

module.exports = resolvers