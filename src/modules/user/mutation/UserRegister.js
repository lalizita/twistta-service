import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../../../models/User';
import { generateToken } from '../../../auth';

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
    return { username:user.username, token: generateToken(user)}
  },
  outputFields: {
    username: {
      type: GraphQLString,
      resolve: ({ username }) =>  username
    },
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    }
  }
})