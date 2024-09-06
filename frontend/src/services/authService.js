// Registrierung
export const registerUser = async (data) => {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  // Login
  export const loginUser = async (data) => {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  };
  
  // Dashboard-Daten abrufen
  export const getDashboard = async (token) => {
    const response = await fetch('http://localhost:5000/api/dashboard', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  };
  