import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectDatabase from './src/database';
import { schema } from './src/schema';

(async () => {
  await connectDatabase();
  const server = new ApolloServer({ schema });
  const app = express();
  server.applyMiddleware({ app });
  
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();