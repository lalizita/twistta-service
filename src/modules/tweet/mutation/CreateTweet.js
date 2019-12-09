import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import TweetModel from '../../../models/Tweet';
import TweetType from '../../../modules/tweet/TweetType';
import { generateToken } from '../../../auth';

export default mutationWithClientMutationId({
  name: 'CreateTweet',
  inputFields: {
    author: {
      type: new GraphQLNonNull(GraphQLID)
    },
    parent: {
      type: GraphQLString
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  mutateAndGetPayload: async ({ author, parent, text }, args, context) => {
    console.log("CONTEXT", context)
    let tweet = new TweetModel({
      author,
      parent,
      text,
    });

    await tweet.save();

    const tweetsListByAuthor = await TweetModel.find({ author })
    console.log("TWEETS BY", tweetsListByAuthor)
    return {tweetsListByAuthor}
  },
  outputFields: {
    tweets: {
      type: GraphQLList(TweetType),
      resolve: ({ tweetsListByAuthor }) => tweetsListByAuthor
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) => error
    },
  }
})