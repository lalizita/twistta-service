import { GraphQLString, GraphQLNonNull } from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import UserModel from '../../../models/User';
import { generateToken } from '../../../auth';

export default mutationWithClientMutationId({
  name: 'UserLogin',
  inputFields: {
    username: {
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
  },
  mutateAndGetPayload: async ({ username, password }) => {
    const user = await UserModel.findOne({ username: username.toLowerCase()})
    if(!user) return { error: 'invalid user' }
    const correctPassword = user.authenticate(password)
    if(!correctPassword) return {error: 'invalid password'}
    return { token: generateToken(user) }
  },
  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token
    },
    error: {
      type: GraphQLString,
      resolve: ({ error }) =>  error
    }
  }
})