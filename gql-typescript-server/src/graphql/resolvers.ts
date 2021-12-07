import { users, vendorList, ExpenseList } from '../../database/mockdata'
import { v4 as uuid } from 'uuid'


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves Users from the "users" array from database.

interface UserInterface {
    id: string,
    expname: string,
    exptype: string,
    amount: number,
    date: string,
    vendorId: string,
}
type UserReqType = Omit<UserInterface, 'id'>;

interface VendorInterface {
    id: string,
    name: string,
    type: string,
    address: string
}
type VendorReqType = Omit<VendorInterface, 'id'>;

export const resolvers = {
    Query: {
        users: () => users,
        vendors(parent: any, args: any, ctx: any, info: any) {
            // ctx is the context defined at > new ApolloServer({ ... context: {} });
            console.log('Query > vendors > ctx ', ctx);
            return vendorList;
        },
        expenses(parent: any, args: any, ctx: any, info: any) {
            return ExpenseList
        }
    },
    Mutation: {
        createVendor(parent: undefined, args: VendorReqType, ctx: any, info: any) {
            const vendor: VendorInterface = {
                id: uuid(),
                name: args.name,
                type: args.type,
                address: args.address
            }

            vendorList.push(vendor);
            return vendor;
        },
        addExpense(parent: undefined, args: UserReqType) {
            console.log('addExpense > args ', args)
            const expense: UserInterface = {
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
        vendor(parent: UserInterface, args: any, ctx: any, info: any) {
            return vendorList.find(vendor => vendor.id === parent.vendorId)
        }
    },
    Vendor: {
        earning(parent: VendorInterface) {
            return ExpenseList.filter(expense => expense.vendorId === parent.id)
        }
    }
};
