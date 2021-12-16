const { gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  type me {
    name: String!
    email: String!
    iat: Int!
    exp: Int!
  }
  type User {
    name: String!
    email: String!
    password: String!
  }
  type Login {
    name: String!
    email: String!
    password: String!
    token: String!
  }

  type LoginResponse {
    name: String!
    email: String!
    token: String!
  }

  type WorkersAndProviders {
    id: String!,
    name: String!,
    address: String!,
    type: String!,
    additionalDetail: String,
    contact: String,
    workerInvoice: [WorkerInvoice!]
    vendorInvoice: [VendorInvoice]
  }

  type WorkerInvoice {
    id: String!,
    wpid: String!,
    wage: Int!,
    date: String,
    halfDay: Boolean,
    note: String, 
  }

  type VendorInvoice {
    id: String!,
    wpid: String!,
    date: String,
    purchasedItems: [VendorExpenseItem]
  }
  type VendorExpenseItem {
    expense_item: String!,
    cost: Int!,
    qty: String,
  }


  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createVendor(name: String!, type: String!, address: String): Vendor!
    login(email: String!, password: String!): LoginResponse!
    createWorkerInvoice(wpid: String!, wage: Int!, date: String, halfDay: Boolean, note: String): WorkerInvoice!
  }

  type Vendor {
      id: ID!
      name: String!
      type: String!
      address: String! 
  }

  type Query {
    me: me!
    users: [User]!
    vendors: [Vendor!]!
    providers: [WorkersAndProviders]!
    workerInvoice: [WorkerInvoice]!
    vendorInvoice: [VendorInvoice]!
  }
`;

