import React, { useState } from 'react';
import { loginUser } from '../services/authService'; // Du musst diesen Service erstellen
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      if (response.message === 'Login successful') {
        toast.success('Login successful! Redirecting to Dashboard...', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error('Login failed!');
      }
    } catch (error) {
      toast.error('Error occurred during login.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn-login">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
