// tests/integration/authRoutes.test.js
const request = require('supertest');
const app = require('../../app');

describe('Auth Routes', () => {
  it('should register a user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    });
    expect(res.statusCode).toBe(201);
  });
});
