// import { graphql } from 'graphql';
// import mongoose from 'mongoose';
// import { connectMongoose, createUser, clearDatabase, createTweet } from './helper';
// import { schema } from '../src/schema';
// const { ObjectId } = mongoose.Types;

// const userLogin = () => {
//   const { _id } = await createUser('lary_cost', 'jon@stark.com', '123456');
//   global.authorId = ObjectId(_id)
//     const query = `
//       mutation M(
//         $username: String!
//         $password: String!
//       ) {
//         UserLogin(input: {
//           username: $username
//           password: $password
//         }) {
//           token
//           error
//         }
//       }
//     `
//     const variables = {
//       username: 'lary_cost',
//       password: '123456'
//     }
//     const {
//       data: { UserLogin }
//     } = await graphql(schema, query, {}, {}, variables)
//     expect(UserLogin.token).not.toBe(null)
//     expect(UserLogin.error).toBe(null)
// }

// describe('tweet test', () => {
//   beforeAll(async() => {
//     await connectMongoose();
//     await userLogin();
//   })
//   beforeEach(async() => await clearDatabase())
//   // it('it should return a tweets list of a user', async() => {
//   //   const text1 = 'Hello People! I wanna show u my graphQL!';
//   //   const text2 = 'Suck my graphQL!';
//   //   const { _id } = await createUser('jon snow', 'jon@stark.com', '543212');
//   //   await createTweet(_id, text1);
//   //   await createTweet(_id, text2);
//   //   global.authorId = ObjectId(_id)
//   //   const query = `
//   //     query Q($id: ID!){
//   //       tweets(id: $id) {
//   //         text
//   //       }
//   //     }
//   //   `
//   //   const variables = {
//   //     id: global.authorId.toString(),
//   //   }

//   //   const { data: { tweets } } = await graphql(schema, query, {}, {}, variables);
//   //   expect(tweets).toMatchSnapshot();
//   //   expect(tweets[0].text).toBe(text1);
//   //   expect(tweets[1].text).toBe(text2);
//   // })
//   it('should create a tweet if user is authenticated', async() => {
//     const query = `
//       mutation M($id: ID!){
//         CreateTweet(id: $id) {
//           text
//         }
//       }
//     `
//     const variables = {
//       id: global.authorId.toString(),
//     }

//     const { data: { tweets } } = await graphql(schema, query, {}, {}, variables);
//   })
// })