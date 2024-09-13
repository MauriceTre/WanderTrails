import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import { getSavedHikingTrails } from '../services/authService'; // Importiere die API-Funktion
import { getDashboard, updateUserAvatar } from '../services/authService';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [user, setUser] = useState({
    name: '',
    age: '',
    location: '',
    avatarUrl: '',
  });
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getDashboard(token);
        console.log("hallo", data)
        if (data) {
          setUser({
            name: data.user.username || '',
            age: data.user.age || '',
            location: data.user.location || '',
            avatarUrl: data.user.avatarUrl || '',
          });
        }
      } catch (err) {
        setError('Fehler beim Abrufen der Benutzerdaten');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchTrails = async () => {
      const token = localStorage.getItem('token');
      try {
        const savedTrails = await getSavedHikingTrails(token);
        setTrails(savedTrails);
      } catch (err) {
        setError('Fehler beim Abrufen der gespeicherten Routen');
      }
    };
    fetchTrails();
  }, []);

  const handleAvatarChange = async (newAvatarUrl) => {
    const token = localStorage.getItem('token');
    setAvatarLoading(true);
    try {
      await updateUserAvatar(token, newAvatarUrl);
      setUser({ ...user, avatarUrl: newAvatarUrl });
    } catch (err) {
      setError('Fehler beim Aktualisieren des Avatars');
    } finally {
      setAvatarLoading(false);
    }
  };

  if (loading) return <div>Lade Benutzerdaten...</div>;

  return (
    <div className="dashboard-page">
      {error && <div className="error-message">{error}</div>}
      <div className="user-section">
        <Avatar 
          avatarUrl={user.avatarUrl} 
          onAvatarChange={handleAvatarChange} 
          loading={avatarLoading}
        />
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
          {trails.length > 0 ? (
            trails.map((trail, index) => (
              <li key={index}>{trail.route_name}</li>
            ))
          ) : (
            <li>Keine gespeicherten Routen gefunden.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPage;
