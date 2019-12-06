import { graphql } from 'graphql';
import { connectMongoose, createUser, clearDatabase, createTweet } from './helper';
import { schema } from '../src/schema';

describe('tweet test', () => {
  beforeAll(async() => {
    await connectMongoose();
  })
  // beforeEach(async() => await clearDatabase())
  it('it should return a tweets list of a user', async() => {
    const text1 = 'Hello People! I wanna show u my graphQL!';
    const text2 = 'Suck my graphQL!';
    const { _id } = await createUser('jon snow', 'jon@stark.com', '543212');
    console.log('ID', _id)
    const tweet1 = await createTweet(_id, text1);
    const tweet2 = await createTweet(_id, text2);
    const query = `
      query Q{
        tweets(author: $id) {
          text
        }
      }
    `
    const res = await graphql(schema, query, {}, {}, {id: _id});
    console.log("REEEEES=>>>>>", res)
    // expect(tweet1.text).toBe(text1);
    // expect(tweet2.text).toBe(text2);
  })
})