const { ApolloServer, gql } = require('apollo-server')

const generateId = () => Math.floor(Math.random() * 100)

const posts = [
  {
    id: generateId(),
    title: 'GraphQL Middleware',
    body: 'Something about middleware',
    category: 'Tutorial'
  }
]

const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    body: String
    category: String
  }

  type Query {
    posts: [Post!]!
  }

  type Mutation {
    createPost(title: String!, body: String!, category: String!): Post
  }
`

const resolvers = {
  Query: {
    posts: () => posts
  },
  Mutation: {
    createPost: (parent, args) => ({
      id: generateId(),
      ...args
    })
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
