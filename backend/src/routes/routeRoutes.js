const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Middleware zum Überprüfen des Tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route speichern
router.post('/routes/save', authenticateToken, async (req, res) => {
  const { routeName, markers } = req.body;
  const userId = req.user.id;

  try {
    // Konvertiere Marker-Array in JSON-String
    const markersJson = JSON.stringify(markers);

    await db.query('INSERT INTO routes (user_id, route_name, markers) VALUES (?, ?, ?)', 
                   [userId, routeName, markersJson]);

    res.status(201).json({ message: 'Route successfully saved' });
  } catch (error) {
    console.error('Error saving route:', error);
    res.status(500).json({ message: 'Failed to save route' });
  }
});

// Gespeicherte Routen abrufen
router.get('/routes/user-routes', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [routes] = await db.query('SELECT route_name, markers FROM routes WHERE user_id = ?', [userId]);

    // Konvertiere Marker-JSON-Strings zurück in Arrays
    const routesWithMarkers = routes.map(route => ({
      route_name: route.route_name,
      markers: JSON.parse(route.markers),
    }));

    res.status(200).json(routesWithMarkers);
  } catch (error) {
    console.error('Error fetching routes:', error);
    res.status(500).json({ message: 'Failed to fetch routes' });
  }
});

module.exports = router;
