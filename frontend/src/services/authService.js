// Registrierung
export const registerUser = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Registrierung fehlgeschlagen');
    }
    const result = await response.json();
    if (result.token) {
      // Token im localStorage speichern
      localStorage.setItem('token', result.token);
    }
    return result;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

// Login
export const loginUser = async (data) => {
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Login fehlgeschlagen');
    }
    const result = await response.json();
    if (result.token) {
      // Token im localStorage speichern
      localStorage.setItem('token', result.token);
    }
    return result;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Dashboard-Daten abrufen
export const getDashboard = async (token) => {
  try {
    console.log("Token used for request:", token); // Debugging-Zwecke
    const response = await fetch('http://localhost:5000/api/dashboard', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Korrekte Header-Name
      },
    });

    if (!response.ok) {
      const errorData = await response.json(); // Fehlerdetails aus der Antwort lesen
      console.error('Error response from server:', errorData);
      throw new Error(`Daten konnten nicht abgerufen werden: ${errorData.message}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};

// Avatar-Update
export const updateUserAvatar = async (token, avatarUrl) => {
  try {
    const response = await fetch('http://localhost:5000/api/updateAvatar', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ avatarUrl }),
    });
    if (!response.ok) {
      throw new Error('Avatar-Update fehlgeschlagen');
    }
    return response.json();
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};
// Funktion zum Speichern der Route im Backend
export const saveRoute = async (token, routeName, markers) => {
  try {
    const response = await fetch('http://localhost:5000/api/saveRoute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Token für Authentifizierung
      },
      body: JSON.stringify({ routeName, markers }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Fehler beim Speichern der Route: ${errorData.message}`);
    }

    return response.json(); // Erfolgreiche Antwort verarbeiten
  } catch (error) {
    console.error('Error saving route:', error);
    throw error;
  }
};
