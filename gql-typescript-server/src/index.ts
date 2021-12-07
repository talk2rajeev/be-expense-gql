
const { ApolloServer, gql } = require('apollo-server');
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers';


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }) => {
    return { user: {name: 'rajeev'} };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});



  

