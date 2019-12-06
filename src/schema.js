import { GraphQLSchema } from 'graphql';

import QueryType from './type/QueryType';
import MutationType from './type/MutationType';

console.log(MutationType)

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});