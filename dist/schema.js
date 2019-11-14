"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./models/User"));
const graphql_1 = require("graphql");
const UserType = new graphql_1.GraphQLObjectType({
    // We are wrapping fields in the function as we dont want to execute this ultil
    // everything is inilized. For example below code will throw error AuthorType not
    // found if not wrapped in a function
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString }
    }),
    name: "User"
});
// RootQuery describe how users can use the graph and grab data.
// E.g Root query to get all authors, get all books, get a particular
// book or get a particular author.
const RootQuery = new graphql_1.GraphQLObjectType({
    fields: {
        users: {
            type: new graphql_1.GraphQLList(UserType),
            resolve(parent, args) {
                return User_1.default.find({});
            }
        }
    },
    name: "RootQueryType"
});
const Mutation = new graphql_1.GraphQLObjectType({
    fields: {
        addUser: {
            args: {
                // GraphQLNonNull make these field required
                name: { type: new graphql_1.GraphQLNonNull(graphql_1.GraphQLString) }
            },
            resolve(parent, args) {
                const user = new User_1.default({
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
const schema = new graphql_1.GraphQLSchema({
    mutation: Mutation,
    query: RootQuery
});
exports.default = schema;
//# sourceMappingURL=schema.js.map