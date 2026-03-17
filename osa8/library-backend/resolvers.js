const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

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
    me: (root, args, context) => {
      return context.currentUser
    },
    booksByGenre: async (root, args) => {
      const books = await Book.find({}).populate('author')

      if (args.genre === '') {
        return books
      }

      const filteredBooks = books.filter((b) => b.genres.includes(args.genre))
      return filteredBooks
    }
  },

  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id })
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      let author = await Author.findOne({ name: args.author })
      const bookExists = await Book.exists({ name: args.title })

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      if (args.title.length < 5) {
        throw new GraphQLError(`Title must be 5 or more letters: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

      if (args.author.length < 4) {
        throw new GraphQLError(`Authors name must be 4 or more letters: ${args.author}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
          },
        })
      }

      if (bookExists) {
        throw new GraphQLError(`Title must be unique: ${args.title}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

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
      
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
      
      return Book.findById(book._id).populate('author')
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      const author = await Author.findOne({ name: args.name })

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      
      if (!author) {
        return null
      }

      author.born = args.setBornTo
      
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError(`Saving author failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
      
      return author
    },

    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError`Creating the user failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          }
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

module.exports = resolvers