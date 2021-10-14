import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuid } from 'uuid'
// Scalar types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27
}, {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1',
    likeId: '1',
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '2',
    likeId: '2',
}, {
    id: '12',
    title: 'Javascript',
    body: 'This is an advanced JS post...',
    published: false,
    author: '3',
    likeId: '3',
}, {
    id: '13',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '2',
    likeId: '4',
}]

const comments = [{
    id: '102',
    text: 'This worked well for me. Thanks!',
    author: '1',
}, {
    id: '103',
    text: 'Glad you enjoyed it.',
    author: '2'
}, {
    id: '104',
    text: 'This did no work.',
    author: '3'
}, {
    id: '105',
    text: 'Nevermind. I got it to work.',
    author: '2'
}];

const likes = [{
    id: '1',
    likesCount: 123,
    post: '10'
}, {
    id: '2',
    likesCount: 47,
    post: '11'
}, {
    id: '3',
    likesCount: 29,
    post: '12'
}, {
    id: '4',
    likesCount: 58,
    post: '12'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        likes: [Like!]!
        me: User!
    }

    type Mutation {
        createUser(name:  String!, email: String!, age: Int!): User!
        createPost(title: String!, body:  String!, published: Boolean!, authorId: String!): Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        like: Like
    }

    type Comment {
        id: ID!,
        text: String!
        author: User!
    }

    type Like {
        id: ID!,
        likesCount: Int!
    }

`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        },
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com',
            }
        },
        comments() {
            return comments
        },
        likes(parent, args, ctx, info) {
            return likes;
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info){
            const emailTaken = users.some(user => user.email === args.email);
            if(emailTaken) {
                return new Error('Email Id not available');
            } 
            const user = {
                id: uuid(),
                name: args.name,
                email: args.email,
                age: args.age
            }

            users.push(user);

            return user;
        },
        createPost(parent, args, ctx, info){
            const isUserExist = users.some(user => user.id === args.authorId)
            console.log('createt POST args', args);
            if(!isUserExist) {
                return new Error('user does not exist')
            }
            const post = {
                id: uuid(),
                title: args.title,
                body: args.body,
                published: args.published,
                author: args.authorId,
            }
            console.log('post ', post);
            posts.push(post);

            return post;
        }
    },
    Post: {
        author(parent, args, ctx, info){
            return users.find(user => user.id === parent.author)
        },
        like(parent, args, ctx, info){
            return  likes.find(like => like.id === parent.likeId)
        },
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter(post=> post.author === parent.id)
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment=> comment.author === parent.id)
        },
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find(user => user.id === parent.author)
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