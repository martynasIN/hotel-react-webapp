// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/user/user.scss';
import { useLoading } from '../context/LoadingContext';
import { createUser } from '../services/AuthServices';

function Register() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Registracija';
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoading(true);
    setError(null);

    // Minimali klientinė validacija
    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      setError('Prašome užpildyti visus laukus.');
      setIsLoading(false);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Slaptažodis turi būti bent 6 simboliai.');
      setIsLoading(false);
      setLoading(false);
      return;
    }

    const userData = { name, email, password, passwordConfirm };
      console.log(userData)
    try {
      await createUser(userData);
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
      <h2>Registracija</h2>
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
        <label htmlFor="email">El. paštas</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          <label htmlFor="password">Pakartok Slaptažodį</label>
          <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="input"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
              disabled={isLoading}
          />
        <button type="submit" className='btn-submit' disabled={isLoading}>
          {isLoading ? 'Registruojama...' : 'Registruotis'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
      <div className="form-footer">
        Jau turite paskyrą? <Link to="/login">Prisijunkite</Link>
      </div>
    </div>
  );
}

export default Register;