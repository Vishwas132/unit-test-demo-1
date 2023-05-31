const request = require('supertest');
const app = require('../../app'); // Assuming your Express app is exported from app.js
const db = require('../../models');
const { deleteUser } = require('../../services/user');
// const { createUser } = require('../services/user');

const userAuth = {
  email: "test@example.com",
  password: "password123"
}

// Assuming you have imported the necessary dependencies
afterAll(async () => {
  // await db.sequelize.truncate();
  deleteUser(userAuth.email);
})

// jest.mock("../services/user.js", () => ({
//   createUser: jest.fn().mockResolvedValue({
//     id: 1,
//     name: "John Doe",
//     userObj: {}
//   })
// }))

describe('POST /auth/register', () => {
  it('should return 401 error if email is not provided', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ password: userAuth.password });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide an email address.' });
  });

  it('should return 401 error if password is not provided', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: userAuth.email });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide a password.' });
  });

  it('should create user object and return 200 status with userObj', async () => {
    // createUser.mockResolvedValue({
    //   id: 1,
    //   name: "John Doe",
    //   userObj: {}
    // })
    const response = await request(app)
      .post('/auth/register')
      .send({ email: userAuth.email, password: userAuth.password });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userObj.id');
  });

  it('should return 401 error if there was an error creating user', async () => {
    // Mock the createUser function to return null
    // createUser.mockResolvedValue({ error: 'There was an error please try again' })
    const response = await request(app)
      .post('/auth/register')
      .send({ email: userAuth.email, password: userAuth.password });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'There was an error please try again' });
  });
});

