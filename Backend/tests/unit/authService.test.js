const authService = require('../../services/authService');
const userRepository = require('../../repositories/userRepository');
// const valkey = require('../../config/valkey');
jest.mock('../../repositories/userRepository');
// jest.mock('../../config/valkey');

describe('authService', () => {
  it('should register a user', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);
    userRepository.saveUser.mockResolvedValue({ email: 'test@example.com' });
    const user = await authService.register({ email: 'test@example.com', password: 'password' });
    expect(user.email).toBe('test@example.com');
  });
});