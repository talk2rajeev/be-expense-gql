
const { ApolloServer, gql } = require('apollo-server');
import { typeDefs } from './graphql/schema'
import { resolvers } from './graphql/resolvers';
import { getPayload } from './util'


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ req }: {req: any}) => {
    const token = req.headers.authorization || '';

    let response = {user: {}, loggedIn: false};

    if(token !== '') {
      // try to retrieve a user with the token
      const { payload: user, loggedIn } = getPayload(token);
      response =  {user, loggedIn};
    }
    
    return response;
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }: any) => {
  console.log(`🚀  Server ready at ${url}`);
});



  

