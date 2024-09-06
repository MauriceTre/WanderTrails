const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const jwt = require('jsonwebtoken');  // JWT für Authentifizierung
const { authenticateToken } = require('./middleware/authMiddleware'); // Middleware für Authentifizierung
const db = require('./config/db'); // Verbindung zur Datenbank
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Auth routes
app.use('/api', authRoutes);

// Dashboard-Route
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Die User-ID kommt aus dem Token
  try {
    const user = await db.query('SELECT username, age, location, avatarUrl FROM users WHERE id = ?', [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const routes = await db.query('SELECT * FROM routes WHERE user_id = ?', [userId]); // Routen des Nutzers abrufen
    res.status(200).json({ user: user[0], routes });
  } catch (error) {
    console.error('Fehler beim Abrufen des Dashboards:', error);
    res.status(500).json({ message: 'Fehler beim Abrufen des Dashboards' });
  }
});

// Avatar-Update-Route
app.put('/api/updateAvatar', authenticateToken, async (req, res) => {
  const userId = req.user.id; // Die User-ID kommt aus dem Token
  const { avatarUrl } = req.body;

  try {
    await db.query('UPDATE users SET avatarUrl = ? WHERE id = ?', [avatarUrl, userId]);
    res.status(200).json({ message: 'Avatar erfolgreich aktualisiert' });
  } catch (error) {
    console.error('Fehler beim Avatar-Update:', error);
    res.status(500).json({ message: 'Avatar-Update fehlgeschlagen' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

