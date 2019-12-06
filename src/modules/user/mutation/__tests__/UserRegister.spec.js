import { graphql } from 'graphql';
import { connectMongoose } from '../../../../../test/helper';
import UserModel from '../../../../models/User';
import { schema } from '../../../../schema'

describe('User register test', () => {
  beforeAll(async() => {
    await connectMongoose();
  })
  it('Should create a user', async () => {
    const userObject = {
      username: 'lais_registrada',
      email: 'lais@mail.com',
      password: '123234'
    }

    const query =`
      mutation M(
        $username: String!
        $email: String!
        $password: String!
      ) {
        UserRegister(input: {
          username: $username
          email: $email
          password: $password
        }) {
          username
        }
      }
    `
    const variables = userObject
    const res = await graphql(schema, query, {}, {}, variables)
  })
})