/* Importing the express and apollo-server-express packages. */
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

/* Importing the typeDefs and resolvers from the index.js file in the schema folder. */
import { typeDefs, resolvers } from './src/schema/index';

// initialize express
const app = express();
const host = process.env.HOST || 'http://localhost';
const port = process.env.PORT || 4888;
const Mongo_URI = process.env.URI || 'mongodb://localhost:27017/graphgqltest';

/* Creating a new instance of the ApolloServer class. */
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

/**
 * Start the server, apply the middleware, and listen on the port.
 */
const start = async () => {
  await mongoose
    .connect(Mongo_URI, { useNewUrlParser: true })
    .then(() => console.log('db connected'))
    .catch((err) => console.log(err.message));

  await server.start();

  server.applyMiddleware({ app });

  app.listen(port, () =>
    console.log(`server is live on ${host}:${port}${server.graphqlPath}`),
  );
};

/* Calling the start function. */
start();
