// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/user/user.scss';
import { useLoading } from '../context/LoadingContext';
import { login } from '../services/AuthServices';

function Login() {
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Prisijungimas';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError(null);

    // Minimali klientinė validacija
    if (!name.trim() || !password.trim()) {
      setError('Prašome užpildyti visus laukus.');
      setIsLoading(false);
      setLoading(false);
      return;
    }

    try {
      await login(name, password);
      navigate('/dashboard');
    } catch (err) {
        setError(err.message);
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Prisijungimas</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="username">Vartotojo vardas</label>
        <input
          type="text"
          id="username"
          name="username"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          disabled={isLoading}
        />
        <label htmlFor="password">Slaptažodis</label>
        <input
          type="password"
          id="password"
          name="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
        <button type="submit" className='btn-submit' disabled={isLoading}>
          {isLoading ? 'Prisijungiama...' : 'Prisijungti'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-footer">
        Neturite paskyros? <Link to="/register">Užsiregistruokite</Link> <br />
      </div>
    </div>
  );
}

export default Login;