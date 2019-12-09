import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';

const TweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'Tweets of a user',
  fields: () => ({
    author: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: tweet => tweet.author
    },
    parent: {
      type: GraphQLID,
      resolve: tweet => tweet.parent
    },
    text: {
      type: GraphQLString,
      resolve: tweet => tweet.text
    },
  })
})

export default TweetType;