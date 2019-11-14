import User from "./models/User";

import {
    GraphQLID, GraphQLList,
    GraphQLNonNull, GraphQLObjectType,
    GraphQLSchema, GraphQLString
} from "graphql";

const UserType = new GraphQLObjectType({
    // We are wrapping fields in the function as we dont want to execute this ultil
    // everything is inilized. For example below code will throw error AuthorType not
    // found if not wrapped in a function
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString }
    }),
    name: "User"
});

// RootQuery describe how users can use the graph and grab data.
// E.g Root query to get all authors, get all books, get a particular
// book or get a particular author.
const RootQuery = new GraphQLObjectType({
    fields: {
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        }
    },
    name: "RootQueryType"
});

const Mutation = new GraphQLObjectType({
    fields: {
        addUser: {
            args: {
                // GraphQLNonNull make these field required
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const user = new User({
                    name: args.name
                });
                return user.save();
            },
            type: UserType
        }
    },
    name: "Mutation"
});

// Creating a new GraphQL Schema, with options query which defines query
// we will allow users to use when they are making request.
const schema = new GraphQLSchema({
    mutation: Mutation,
    query: RootQuery
});

export default schema;
