const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository.js');

const register = async ({ email, password, role = 'user' }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepository.saveUser({ email, password: hashedPassword, role });
};

const login = async (email, password, ip) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid password');

  // Inclure userId et role dans le token
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // Tu peux aussi enregistrer la session si tu veux (commenté pour l'instant)
  // const sessionData = { token, lastActive: Date.now(), ip };
  // await setEx(`session:${user._id}`, 3600, JSON.stringify(sessionData));

  return { token, user: { id: user._id, email: user.email, role: user.role } };
};

module.exports = { register, login };
