import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import connectDatabase from './src/database';
import { schema } from './src/schema';
import { getUser } from './src/auth';

(async () => {
  try {
    await connectDatabase();
  } catch(error) {
    console.log("could not connect to database", {error})
    throw error
  }

  const server = new ApolloServer({ 
    schema,
    context: async ({ req }) => {
      console.log("REQ =====", req)
      const token = req.headers.authorization || '';
      try{
        const user = await getUser(token);
        return user
        
      } catch(error){
        console.log("Unable to authenticate using auth token", error)
      }
      return {
        req,
        user,
      }
    }
   });
  const app = express();
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
})();