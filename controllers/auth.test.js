const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const { createUser } = require('../services/user');
const auth = require('./auth');

describe('POST /auth/register', () => {
  app.use(auth);
  test('should return 401 error if email is not provided', async () => {
    const response = await request(app)
      .post('/register')
      .send({ password: 'password123' });
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide an email address.' });
  });

  test('should return 401 error if password is not provided', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Please provide a password.' });
  });

  test('should create user object and return 200 status with userObj', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test260503@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userObj');
  });

  test('should return 401 error if there was an error creating user', async () => {
    // Mock the createUser function to return null
    jest.mock('../services/user', () => () => null);

    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'There was an error please try again' });
  });

  test('should handle and log any errors thrown during execution', async () => {
    // Mock the createUser function to throw an error
    jest.mock('../services/user', () => () => {
      throw new Error('Some error message');
    });

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'There was an error please try again' });
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Services -'));
  });
});
