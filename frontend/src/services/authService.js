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
    return response.json();
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
    return response.json();
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Dashboard-Daten abrufen
export const getDashboard = async (token) => {
  try {
    const response = await fetch('http://localhost:5000/api/dashboard', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error('Daten konnten nicht abgerufen werden');
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
