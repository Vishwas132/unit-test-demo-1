const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const db = require('../models');
const { createUser } = require('../services/user');

// Assuming you have imported the necessary dependencies
afterAll(async () => {
  await db.sequelize.drop();
})

jest.mock("../services/user.js", () => ({
  createUser: jest.fn().mockResolvedValue({
    id: 1,
    name: "John Doe",
    userObj: {}
  })
}))

describe('POST /auth/register', () => {
  test('should return 401 error if email is not provided', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ password: 'password123' });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide an email address.' });
  });

  test('should return 401 error if password is not provided', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide a password.' });
  });

  test('should create user object and return 200 status with userObj', async () => {
    createUser.mockResolvedValue({
      id: 1,
      name: "John Doe",
      userObj: {}
    })
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test260503@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userObj.id');
  });

  test('should return 401 error if there was an error creating user', async () => {
    // Mock the createUser function to return null
    createUser.mockResolvedValue({ error: 'There was an error please try again' })
    const response = await request(app)
      .post('/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'There was an error please try again' });
  });
});

