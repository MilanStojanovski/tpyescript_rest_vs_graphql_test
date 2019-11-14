"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const mongoose_1 = __importDefault(require("mongoose"));
require("reflect-metadata");
const keys_1 = require("./config/keys");
const schema_1 = __importDefault(require("./schema"));
const app = express_1.default();
// Body parser middleware
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
// Connect to MongoDB
mongoose_1.default
    .connect(keys_1.keys.mongoURI, { useNewUrlParser: true })
    .then(() => {
    // tslint:disable-next-line:no-console
    console.log("Mongo connected");
})
    .catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
// User routes
// app.use("/api/users", users);
// app.get("/", (req: any, res: any) => {
//     res.send("Hello World");
// });
app.use("/graphql", express_graphql_1.default({
    // directing express-graphql to use graphiql when goto '/graphql' address in the browser
    // which provides an interface to make GraphQl queries
    graphiql: true,
    // directing express-graphql to use this schema to map out the graph
    schema: schema_1.default,
}));
const port = 5000;
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on port: ${port}`);
});
//# sourceMappingURL=server.js.map