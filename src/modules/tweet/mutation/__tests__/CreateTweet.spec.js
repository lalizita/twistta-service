import { graphql } from 'graphql';
import mongoose from 'mongoose';
import { connectMongoose, createUser, clearDatabase, createTweet } from '../../../../../test/helper';
import { schema } from '../../../../schema';
import { getUser } from '../../../../auth';

const { ObjectId } = mongoose.Types;

beforeAll(async() => {
  await connectMongoose();
  const { _id } = await createUser('caroline', 'caroline@mail.com', '123456');
  global.authorId = ObjectId(_id)
})
it("Sould not create a tweet if user is not autenticated", async() => {
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
      username: 'caroline',
      password: '123456'
    }
    const {
      data: { UserLogin }
    } = await graphql(schema, query, {}, {}, variables)

    const queryTweet = `
      mutation M(
        $author: ID!
        $parent: String
        $text: String!
      ) {
        CreateTweet(input: {
          author: $author
          parent: $parent
          text: $text
        }) {
          tweets {
            author
            parent
            text
          }
          error
        }
      }
    `
    const variablesTweet = {
      author: global.authorId.toString(),
      parent: null,
      text: "Hello tweet!"
    }
    const { data: { CreateTweet } } = await graphql(schema, queryTweet, {}, {}, variablesTweet)
   
    expect(CreateTweet.tweets).toBe(null)
    expect(CreateTweet.error).toBe("Usuário não está logado")

})
it('Should create a tweet correctly', async() => {
    const loginQuery = `
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
    const userVariables = {
      username: 'caroline',
      password: '123456'
    }
    const { data: { UserLogin: { token }} } = await graphql(schema, loginQuery, {}, {}, userVariables)
    const { user } = await getUser(token)

    const createTweetQuery = `
      mutation M(
        $author: ID!
        $parent: String
        $text: String!
      ) {
        CreateTweet(input: {
          author: $author
          parent: $parent
          text: $text
        }) {
          tweets {
            author
            parent
            text
          }
          error
        }
      }
    `
    const tweetVariables = {
      author: global.authorId.toString(),
      parent: null,
      text: "Hello tweet! I`m logged in!"
    }
    
    const context = {
      user
    }
    
    const { data: { CreateTweet } } = await graphql(schema, createTweetQuery, {}, context, tweetVariables)
    expect(CreateTweet.tweets[0].text).toBe("Hello tweet! I`m logged in!")
    expect(CreateTweet.tweets[0].author).toBe(global.authorId.toString())
    expect(CreateTweet.tweets[0].parent).toBe(null)
    expect(CreateTweet.error).toBe(null)
})