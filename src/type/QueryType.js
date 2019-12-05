import { GraphQLObjectType, GraphQLList, GraphQLNonNull } from 'graphql';
import UserType from '../modules/user/UserType';
import User from '../models/User';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Query of users',
  fields: () => ({
     users: {
       type: GraphQLList(UserType),
       resolve: (source, args, context, info) => {
         return User.find();
       },
     },
  })
})

export default QueryType;