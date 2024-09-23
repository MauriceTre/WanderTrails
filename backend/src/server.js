const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const routeRoutes = require('./routes/routeRoutes')
const { authenticateToken } = require('./middleware/authMiddleware');
const db = require('./db'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api/routes', routeRoutes);
app.get('/api/dashboard', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  console.log('User ID:', userId); 
  try {
    const [user] = await db.query('SELECT username, age, location, avatarUrl FROM users WHERE id = ?', [userId]);
    console.log('User Data:', user);
    if (user.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const routes = await db.query('SELECT * FROM routes WHERE user_id = ?', [userId]);
    res.status(200).json({ user: user[0], routes });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
});

app.put('/api/updateAvatar', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { avatarUrl } = req.body;

  try {
    await db.query('UPDATE users SET avatarUrl = ? WHERE id = ?', [avatarUrl, userId]);
    res.status(200).json({ message: 'Avatar successfully updated' });
  } catch (error) {
    console.error('Error updating avatar:', error);
    res.status(500).json({ message: 'Avatar update failed' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

