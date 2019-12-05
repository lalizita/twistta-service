import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLNonNull, GraphQLScalarType, GraphQLList } from 'graphql';


const UserType = new GraphQLObjectType({
  name: 'User', 
  description: 'user data',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: user => user._id,
    },
    username: {
      type: GraphQLNonNull(GraphQLString),
      resolve: user => {
        return user.username
      }
    },
    active: {
      type: GraphQLBoolean,
      resolve: user => user.active
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
      resolve: user => user.email
    },
    // tweets: {
    //   type: GraphQLList(TweetType),
    //   resolve: (user, args, context, info) => {
    //     return Tweet.find({user: user._id});
    //   },
    // }
  })
})

export default UserType;