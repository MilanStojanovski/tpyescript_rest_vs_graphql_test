import bodyParser from "body-parser";
import express from "express";
import graphqlHTTP from "express-graphql";
import mongoose from "mongoose";
import "reflect-metadata";
import { keys } from "./config/keys";

import users from "./routes/api/users";
import schema from "./schema";

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
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
app.use("/graphql", graphqlHTTP({
    // directing express-graphql to use graphiql when goto '/graphql' address in the browser
    // which provides an interface to make GraphQl queries
    graphiql: true,
    // directing express-graphql to use this schema to map out the graph
    schema,
}));

const port = 5000;

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server listening on port: ${port}`);
});
