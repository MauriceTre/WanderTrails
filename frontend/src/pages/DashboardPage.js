import React, { useState, useEffect } from 'react';
import Avatar from '../components/Avatar';
import { getSavedHikingTrails } from '../utils/wanderwege';
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
  const [loading, setLoading] = useState(true); // State für Loading-Indikator
  const [error, setError] = useState(null); // State für Fehler-Handling
  const [avatarLoading, setAvatarLoading] = useState(false); // Avatar-Update-Status

  // Fetch user data and saved trails from API
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      try {
        const data = await getDashboard(token); // API Call to get user details
        if (data) {
          setUser({
            name: data.name || '',
            age: data.age || '',
            location: data.location || '',
            avatarUrl: data.avatarUrl || '',
          });
        }
      } catch (err) {
        setError('Fehler beim Abrufen der Benutzerdaten'); // Fehler beim Abrufen
      } finally {
        setLoading(false); // Laden abgeschlossen
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const savedTrails = await getSavedHikingTrails();
        setTrails(savedTrails);
      } catch (err) {
        setError('Fehler beim Abrufen der gespeicherten Routen'); // Fehler beim Abrufen
      }
    };
    fetchTrails();
  }, []);

  // Handle avatar update
  const handleAvatarChange = async (newAvatarUrl) => {
    const token = localStorage.getItem('token');
    setAvatarLoading(true);
    try {
      await updateUserAvatar(token, newAvatarUrl);
      setUser({ ...user, avatarUrl: newAvatarUrl }); // Update the user's avatar in the state
    } catch (err) {
      setError('Fehler beim Aktualisieren des Avatars');
    } finally {
      setAvatarLoading(false);
    }
  };

  if (loading) return <div>Lade Benutzerdaten...</div>; // Loading-Indikator anzeigen

  return (
    <div className="dashboard-page">
      {error && <div className="error-message">{error}</div>} {/* Fehlernachricht anzeigen */}
      <div className="user-section">
        <Avatar 
          avatarUrl={user.avatarUrl} 
          onAvatarChange={handleAvatarChange} 
          loading={avatarLoading} // Loading-Indikator für Avatar
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
              <li key={index}>{trail.name}</li>
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

