import React, { useState } from 'react';
import { registerUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    location: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      if (response.message === 'User successfully created') {
        toast.success('Registration successful! Redirecting to Dashboard...', {
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      } else {
        toast.error('Registration failed!');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error occurred during registration.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login'); // Navigiert zur Login-Seite
  };

  return (
    <div className="landing-container">
      <h2>Willkommen bei WanderTrails</h2>
      <p>Entdecke maßgeschneiderte Wanderwege, die perfekt zu deinen Vorlieben passen!</p>
      
      {/* Registration Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <button type="submit" className="btn-register">Register</button>
      </form>
      
      {/* Login Section */}
      <p>Bereits registriert? <button onClick={handleLoginClick} className="btn-login">Login</button></p>

      <ToastContainer />
    </div>
  );
};

export default LandingPage;


