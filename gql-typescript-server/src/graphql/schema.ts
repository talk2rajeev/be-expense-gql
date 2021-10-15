const { gql } = require('apollo-server');


// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  type User {
    name: String
    email: String
    projects: [Project]
  }

  type Project {
      title: String
      active: Boolean
      members: [User]
  }

  type Query {
    users: [User]
  }
`;

