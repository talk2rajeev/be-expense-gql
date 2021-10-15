import { users } from '../../database/mockdata'

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves Users from the "users" array from database.

export const resolvers = {
    Query: {
      users: () => users
    },
};
