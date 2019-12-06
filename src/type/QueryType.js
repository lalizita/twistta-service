import { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } from 'graphql';
import UserType from '../modules/user/UserType';
import TweetType from '../modules/tweet/TweetType';
import User from '../models/User';
import Tweet from '../models/Tweet';

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
    tweets: {
      type: GraphQLList(TweetType),
     //  args: {
     //    id: "5de9981e5d79b4e1efa4d904"
     //  },
      resolve: (source, args) => {
        console.log("ENTROU NO RESOLVE")
       return Tweet.find({ author: "5de9981e5d79b4e1efa4d904" })
      }
    },
  })
})

export default QueryType;