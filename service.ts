import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import fs from 'fs';
import https from 'https';
import http from 'http';
import { mergeSchemas } from 'graphql-tools';
const { ApolloLogExtension } = require('apollo-log');

import gqlSchema from './src/typedef.graphql';
import { CareApiResolver as resolver } from './src/resolver';

/* Setting port for the server */
const port = process.env.PORT || 8080;

const app = express();
const extensions = [() => new ApolloLogExtension({
  level: 'info',
  timestamp: true,
})];


/* Defining the Apollo Server */
const apollo = new ApolloServer({
  playground: process.env.NODE_ENV !== 'production',
  schema: mergeSchemas({
    schemas: [
      gqlSchema,
    ],
    resolvers: [
      resolver,
    ],
  }),
  subscriptions: {
    path: '/subscriptions',
  },
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack ? error.stack.split('\n') : [],
    path: error.path,
  }),
  extensions
});

/* Applying apollo middleware to express server */
apollo.applyMiddleware({ app });

/*  Creating the server based on the environment */
const server = http.createServer(app);
  // process.env.NODE_ENV !== 'test'
  // ? https.createServer(
  //   {
  //     key: fs.readFileSync((process.env.SSL_KEY) ? `${process.env.SSL_KEY}` : ''),
  //     cert: fs.readFileSync((process.env.SSL_CERT) ? `${process.env.SSL_CERT}` : '')
  //   },
  //   app
  // )
  // : http.createServer(app);

// Installing the apollo ws subscription handlers
apollo.installSubscriptionHandlers(server);
// CareApi
export default server.listen({ port: port }, () => {
  console.log(`🚀 Microservice running on ${process.env.NODE_ENV} at ${port}${apollo.graphqlPath}`);
});
