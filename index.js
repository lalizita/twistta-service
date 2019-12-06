import { ApolloServer, graphqlExpress } from 'apollo-server-express';
import express from 'express';
import connectDatabase from './src/database';
import { schema } from './src/schema';

(async () => {
  try {
    await connectDatabase();
  } catch(error) {
    console.log("could not connect to database", {error})
    throw error
  }

  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();