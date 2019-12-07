import { graphql } from 'graphql';
import mongoose from 'mongoose';
import { connectMongoose, createUser, clearDatabase, createTweet } from '../../../../../test/helper';
import { schema } from '../../../../schema';
const { ObjectId } = mongoose.Types;

// const userLogin = async () => {
//   const { _id } = await createUser('lary_cost', 'jon@stark.com', '123456');
//   global.authorId = ObjectId(_id)
//     const query = `
//       mutation M(
//         $author: ID!
//         $parent: String
//         $text: String!
//       ) {
//         CreateTweet(input: {
//           author: $author
//           parent: $parent
//           text: $text
//         }) {
//           author
//           parent
//           text
//           error
//         }
//       }
//     `
//     const variables = {
//       author: global.authorId.toString(),
//       parent: null,
//       text: "Hello tweet!"
//     }
//     const {
//       data: { CreateTweet }
//     } = await graphql(schema, query, {}, {}, variables)
//     console.log("CREATE TWEET", CreateTweet)
//     // expect(UserLogin.token).not.toBe(null)
//     // expect(UserLogin.error).toBe(null)
// }

beforeAll(async() => {
  await connectMongoose();
  // await userLogin();
})

it('Should not create a tweet correctly', async() => {
  const { _id } = await createUser('lary_cost', 'jon@stark.com', '123456');
  global.authorId = ObjectId(_id)
    const query = `
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
    const variables = {
      author: global.authorId.toString(),
      parent: null,
      text: "Hello tweet!"
    }
    const { data: { CreateTweet } } = await graphql(schema, query, {}, {}, variables)
    console.log("CREATE TWEET", CreateTweet)
    expect(CreateTweet.tweets[0].text).toBe("Hello tweet!")
    expect(CreateTweet.tweets[0].author).toBe(global.authorId.toString())
    expect(CreateTweet.tweets[0].parent).toBe(null)
    expect(CreateTweet.error).toBe(null)
})