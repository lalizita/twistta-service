import { GraphQLString, GraphQLNonNull, GraphQLID, GraphQLList } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import TweetModel from '../../../models/Tweet';
import TweetType from '../../../modules/tweet/TweetType';

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
  mutateAndGetPayload: async ({ author, parent, text }, context) => {
    if(!context.user) return {error: "Usuário não está logado"}
    let tweet = new TweetModel({
      author,
      parent,
      text,
    });

    await tweet.save();

    const tweetsListByAuthor = await TweetModel.find({ author })
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