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

  type Mutation {
      createVendor(name: String!, type: String!, address: String): Vendor!
      addExpense(expname: String!, exptype: String!, amount: Int!, date: String!, vendorId: String!): Expense!
  }

  type Vendor {
      id: ID!
      name: String!
      type: String!
      address: String
      earning: [Expense!] 
  }

  type Expense {
      id: ID!
      expname: String!
      exptype: String!
      amount: Int!
      date: String!
      vendor: Vendor!
  }

  type Query {
    users: [User]
    vendors: [Vendor!]!
    expenses: [Expense!]! 
  }
`;

