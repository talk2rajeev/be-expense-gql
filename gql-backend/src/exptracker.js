import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuid } from 'uuid'


const vendorList = [
    {
        id: '4mt4t4--te4asdf-edfgdfg',
        name: 'Sangam Thekedar',
        type: 'Work',
        address: '',
    },
    {
        id: 't1err323--tswrdfgf-tyrhsg',
        name: 'VIP Trading',
        type: 'Material',
        address: 'Marwa',
    },
    {
        id: '4t324t--65ue6eu6-7e65ie56',
        name: 'Sangay Enterprise',
        type: 'Material',
        address: '',
    },
];

const ExpenseList = [
    {
        id: '3yw5yw5y3-herh5ea3-w45wh6ueu',
        expname: 'Mason work',
        exptype: 'labor',
        amount: 1500,
        date: 'Thu Oct 19 2021',
        vendorId: '4mt4t4--te4asdf-edfgdfg'

    },
    {
        id: '45y45ey-56u34tq-78y3qudt6erg',
        expname: 'Balu',
        exptype: 'Material',
        amount: 50000,
        date: 'Mon Nov 15 2021',
        vendorId: '4t324t--65ue6eu6-7e65ie56'
    },
    {
        id: 'a9pert9-43p9utq4-34y4hoiwfg',
        expname: 'Steel',
        exptype: 'Material',
        amount: 24500,
        date: 'Fri Dec 25 2021',
        vendorId: 't1err323--tswrdfgf-tyrhsg'
    },
];

const typeDefs = `
    type Query {
        vendors: [Vendor!]!
        expenses: [Expense!]! 
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

`;

const resolvers = {
    Query: {
        vendors(parent, args, ctx, info) {
            return vendorList;
        },
        expenses(parent, args, ctx, info) {
            return ExpenseList
        }
    },
    Mutation: {
        createVendor(parent, args, ctx, info) {
            const vendor = {
                id: uuid(),
                name: args.name,
                type: args.type,
                address: args.address
            }

            vendorList.push(vendor);
            return vendor;
        },
        addExpense(parent, args, ctx, info) {
            const expense = {
                id: uuid(),
                expname: args.expname,
                exptype: args.exptype,
                amount: args.amount,
                date: args.date,
                vendorId: args.vendorId,
            }  
            console.log('expense obj ', expense);
            
            ExpenseList.push(expense)

            return expense;
        }
    },
    Expense: {
        vendor(parent, args, ctx, info) {
            return vendorList.find(vendor => vendor.id === parent.vendorId)
        }
    },
    Vendor: {
        earning(parent, args, ctx, info) {
            return ExpenseList.filter(expense => expense.vendorId === parent.id)
        }
    }

}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})

