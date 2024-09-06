import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import { getSavedHikingTrails } from '../utils/wanderwege';
import { getDashboard } from '../services/authService';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    location: '',
    avatarUrl: '',
  });
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      const data = await getDashboard(token);  // API Call to get user details
      if (data) {
        setUser({
          name: data.name || '',
          age: data.age || '',
          location: data.location || '',
          avatarUrl: data.avatarUrl || '',
        });
      }
    };
    
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchTrails = async () => {
      const savedTrails = await getSavedHikingTrails();
      setTrails(savedTrails);
    };
    fetchTrails();
  }, []);

  const handleAvatarChange = (newAvatarUrl) => {
    setUser({ ...user, avatarUrl: newAvatarUrl });
  };

  return (
    <div className="dashboard-page">
      <div className="user-section">
        <Avatar avatarUrl={user.avatarUrl} onAvatarChange={handleAvatarChange} />
        <div className="user-info">
          <h2>Willkommen, {user.name}!</h2>
          <div>
            <strong>Name:</strong> {user.name}
          </div>
          <div>
            <strong>Alter:</strong> {user.age}
          </div>
          <div>
            <strong>Wohnort:</strong> {user.location}
          </div>
        </div>
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
