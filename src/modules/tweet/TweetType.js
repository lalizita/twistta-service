import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLList } from 'graphql';

const TweetType = new GraphQLObjectType({
  name: 'Tweet',
  description: 'Tweets of a user',
  fields: () => ({
    author: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: tweet => {
        console.log("TWEET =>>>>>>", tweet)
        return tweet.author
      }
    },
    text: {
      type: GraphQLString,
      resolve: tweet => tweet.text
    },
  })
})

export default TweetType;