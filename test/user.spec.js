import { graphql } from 'graphql';
import { connectMongoose, createUser, clearDatabase, createTweet } from './helper';
import { schema } from '../src/schema';

describe('user test', () => {
  beforeAll(async() => {
    await connectMongoose();
  })
  beforeEach(async() => await clearDatabase())
  it('it show exists a user with called jon snow', async () => {
    const { username, email } = await createUser('jon snow', 'jon@stark.com', '543212');
    const query = `
      query Q{
        users {
          username
          email
        }
      }
    `
    const { data: { users } } = await graphql(schema, query);
    expect(users[0].username).toBe(username);
    expect(users[0].email).toBe(email);
  })
})