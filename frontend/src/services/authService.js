import axios from 'axios';

// Registrierung
export const registerUser = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/register', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.data.token) {
      // Token im localStorage speichern
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/api/login', data, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.data.token) {
      // Token im localStorage speichern
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Dashboard-Daten abrufen
export const getDashboard = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/dashboard', {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Avatar-Update
export const updateUserAvatar = async (token, avatarUrl) => {
  try {
    const response = await axios.put('http://localhost:5000/api/updateAvatar', 
      { avatarUrl }, 
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

// Route speichern
export const saveRoute = async (token, routeName, markers) => {
  try {
    const response = await axios.post('http://localhost:5000/api/routes/save', 
      { routeName, markers }, 
      { headers: { 'Authorization': `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Fehler beim Speichern der Route:', error);
    throw error;
  }
};

// Gespeicherte Routen abrufen
export const getSavedHikingTrails = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/routes/user-routes', {
      headers: { 'Authorization': `Bearer ${token}` },
    });

    // Debug-Ausgabe der Rohantwort
    console.log('Rohantwort vom Server:', response.data);

    return response.data;
  } catch (error) {
    console.error('Fehler beim Abrufen der Routen:', error.response?.data?.message || error.message);
    throw error;
  }
};

