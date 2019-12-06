import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../../../models/User';

export default mutationWithClientMutationId({
  name: 'RegisterUsername',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  mutateAndGetPayload: async ({ username, email, password }) => {
    let user = new UserModel({
      username,
      email,
      password,
    });

    await user.save();
    return user
  },
  outputFields: {
    username: {
      type: GraphQLString,
      resolve: ({ username }) =>  username
    }
  }
})