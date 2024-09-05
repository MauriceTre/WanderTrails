// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import { getSavedHikingTrails } from '../utils/wanderwege';
import { getDashboard } from '../services/authService';
const DashboardPage = () => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    location: '',
    avatarUrl: '',
  });
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    getDashboard(token).then((data) => {
      setRoutes(data.routes);
    });
  }, []);

  useEffect(() => {
    // Fetch saved hiking trails from the backend or local storage
    const fetchTrails = async () => {
      const savedTrails = await getSavedHikingTrails();
      setTrails(savedTrails);
    };
    fetchTrails();
  }, []);

  const handleAvatarChange = (newAvatarUrl) => {
    setUser({ ...user, avatarUrl: newAvatarUrl });
  };

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="dashboard-page">
      <Avatar avatarUrl={user.avatarUrl} onAvatarChange={handleAvatarChange} />
      <div className="user-info">
        <h2>Personal Information</h2>
        <form>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <label>Alter:</label>
            <input
              type="number"
              name="age"
              value={user.age}
              onChange={handleInfoChange}
            />
          </div>
          <div>
            <label>Wohnort:</label>
            <input
              type="text"
              name="location"
              value={user.location}
              onChange={handleInfoChange}
            />
          </div>
        </form>
      </div>
      <div className="hiking-trails">
        <h2>Gespeicherte Routen</h2>
        <ul>
          {trails.map((trail, index) => (
            <li key={index}>{trail.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
