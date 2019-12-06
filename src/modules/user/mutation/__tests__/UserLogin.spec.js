import { graphql } from 'graphql'
import { connectMongoose, createUser, clearDatabase } from '../../../../../test/helper'
import { schema } from '../../../../schema'

const createUsers = async () => {
  await clearDatabase()
  await createUser('lary_joy', 'lary@mail.com', 'mydog123')
  await createUser('midorya', 'mydoria@mail.com', 'mydog123')
  await createUser('cat_joy', 'cast@mail.com', 'mydog123')
}

describe('User register test', () => {
  beforeAll(async () => {
    await connectMongoose()
    await createUsers()
  })
  it('Should not login with a invalid user', async () => {
    const query = `
      mutation M(
        $username: String!
        $password: String!
      ) {
        UserLogin(input: {
          username: $username
          password: $password
        }) {
          token
          error
        }
      }
    `
    const variables = {
      username: 'lalala',
      password: 'mydog123'
    }
    const {
      data: { UserLogin }
    } = await graphql(schema, query, {}, {}, variables)
    expect(UserLogin.error).toBe('invalid user')
    expect(UserLogin.token).toBe(null)
  })
  it('Should not login with invalid password', async () => {
    const query = `
        mutation M(
          $username: String!
          $password: String!
        ) {
          UserLogin(input: {
            username: $username
            password: $password
          }) {
            token
            error
          }
        }
      `
    const variables = {
      username: 'midorya',
      password: '123xxx'
    }
    const {
      data: { UserLogin }
    } = await graphql(schema, query, {}, {}, variables)
    expect(UserLogin.error).toBe('invalid password')
    expect(UserLogin.token).toBe(null)
  })
  it('Should not login correctly', async () => {
    const query = `
        mutation M(
          $username: String!
          $password: String!
        ) {
          UserLogin(input: {
            username: $username
            password: $password
          }) {
            token
            error
          }
        }
      `
    const variables = {
      username: 'lary_joy',
      password: 'mydog123'
    }
    const {
      data: { UserLogin }
    } = await graphql(schema, query, {}, {}, variables)
    expect(UserLogin.token).not.toBe(null)
    expect(UserLogin.error).toBe(null)
  })
})