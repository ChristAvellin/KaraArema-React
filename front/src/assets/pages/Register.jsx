import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });

      const { token, user } = res.data;
      login(token, user);
      navigate('/');
    } catch (err) {
      setError('Erreur lors de l’inscription.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Inscription</h2>
      {error && <p>{error}</p>}
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nom d'utilisateur" required />
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" required />
      <button type="submit">S'inscrire</button>
    </form>
  );
};

export default Register;
