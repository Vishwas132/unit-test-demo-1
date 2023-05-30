// Import the createUser function
const { createUser } = require('./user');
const { User } = require("../models");
const db = require('../models');

afterAll(async () => {
  await db.sequelize.drop();
})

describe('createUser', () => {
  const spy = jest.spyOn(User, "create");
  it('should create a user', async () => {
    // Mock the User.create method to return a user object
    const body = { email: 'test280502@example.com', password: 'password123' };

    // Call the createUser function
    const result = await createUser(body);

    // Expect the User.create method to have been called with the provided body
    expect(spy).toHaveBeenCalledWith(body);

    // Expect the createUser function to return the mocked user object
    expect(result.email).toEqual(body.email);
  });

  it('should handle error during user creation', async () => {
    // Mock the User.create method to throw an error
    const mockError = new Error('Database error');

    // Call the createUser function
    const body = { email: 'test280502@example.com', password: 'password123' };
    const result = await createUser(body);

    // Expect the User.create method to have been called with the provided body
    expect(spy).toHaveBeenCalledWith(body);

    // Expect the createUser function to return an Error object
    expect(result).toBeInstanceOf(Error);
    expect(result.message).toBe('Error creating user');
  });
});