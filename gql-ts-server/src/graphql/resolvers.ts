import { v4 as uuid } from 'uuid'
const bcrypt = require('bcrypt');
const { getToken } = require("../util")
const { AuthenticationError } = require('apollo-server');
import { WorkersAndProvidersInterface, WorkerInvoiceInterface, VendorInvoiceInterface  } from '../graphql/types';
const { fetchUser, users, vendorList, workerInvoice, fetchVendors, fetchProviderWorkers, fetchWorkerInvoice, fetchVendorInvoice } = require('../../database/mockdata');


// Resolvers define the technique for fetching the types defined in the schema.
interface UserInterface {
    name: string
    email: string
    password: string
}

interface VendorInterface {
    id: string,
    name: string,
    type: string,
    address: string
}
type VendorReqType = Omit<VendorInterface, 'id'>;
type WorkerInvoiceInterfaceReq = Omit<WorkerInvoiceInterface, 'id'>

const saltRounds = 10;
const myPlaintextPassword = 'admin';

export const resolvers = {
    Query: {
        me: (parent: undefined, args: any, context: any, info: any) => {
            if (context.loggedIn) {
                return {
                    name: context.user.name,
                    email: context.user.email,
                    iat: context.user.iat,
                    exp: context.user.exp,
                }
            } else {
                throw new AuthenticationError("Please Login Again!")
            }
        },
        
        async vendors(parent: any, args: any, ctx: any, info: any) {
            // ctx is the context defined at > new ApolloServer({ ... context: {} });
            if (ctx.loggedIn) {
                const vendors = await fetchVendors()
                return vendors;
            } else {
                throw new AuthenticationError("Please Login Again!")
            }
            
        },
        async users(parent: any, args: any, ctx: any, info: any) {
            const users = await fetchUser();
            return users
        },
         async providers(parent: any, args: any, ctx: any, info: any) {
            const providers = await fetchProviderWorkers();
            return providers
        },
        async workerInvoice(parent: any, args: any, ctx: any, info: any) {
            const workerInvoice = await fetchWorkerInvoice();
            return workerInvoice;
        },
        async  vendorInvoice(parent: any, args: any, ctx: any, info: any) {
            const vendorInvoice = await fetchVendorInvoice();
            return vendorInvoice;
        },
    },
    Mutation: {
        login: async (parent: any, args: any, context: any, info: any) => {
            const users: Array<UserInterface> = await fetchUser();
            const user = users.find((user: UserInterface) => user.email === args.email);

            // const isMatch = await comparePassword(args.password, user.password)
            
            if (user) {
                const isPasswordMatch = bcrypt.compareSync(args.password, user.password)
                if (isPasswordMatch) {
                    const token = getToken(user)
                    return { email: user.email, name: user.name,  token };
                } else {
                    throw new AuthenticationError("Wrong Password!")
                }
            } else {
                throw new AuthenticationError("User Doesn't exist")
            }
        },
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
        async createUser(parent: undefined, args: UserInterface, ctx: any, info: any) {
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(myPlaintextPassword, salt);

            console.log('salt, hash', salt, hash)

            // const users: Array<UserInterface> = await fetchUser();
            const user: UserInterface & {id: string} = {
                id: uuid(),
                name: args.name,
                email: args.email,
                password: hash
            }
            users.push(user);

            return user;
        },
        createWorkerInvoice(parent: undefined, args: WorkerInvoiceInterfaceReq, ctx: any, info: any) {
            
            const invoice: WorkerInvoiceInterface = {
                id: uuid(),
                wpid: args.wpid,
                wage: args.wage,
                date: args.date,
                halfDay: args.halfDay,
                note: args.note, 
            }

            workerInvoice.push(invoice);
            console.log(invoice, workerInvoice)
            return invoice;
        },
    },
    WorkersAndProviders: {
        async workerInvoice(parent: WorkersAndProvidersInterface, args: any, ctx: any, info: any) {
            const workerInvoice = await fetchWorkerInvoice();
            return workerInvoice.filter((invoice: WorkerInvoiceInterface) => invoice.wpid === parent.id) || null
        },
        async vendorInvoice(parent: WorkersAndProvidersInterface, args: any, ctx: any, info: any) {
            const workerInvoice = await fetchVendorInvoice();
            return workerInvoice.filter((invoice: VendorInvoiceInterface) => invoice.wpid === parent.id) || null
        }
    },
};
