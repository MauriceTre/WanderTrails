const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Route speichern
router.post('/save', authenticateToken, async (req, res) => {
  const { routeName, markers } = req.body;
  const userId = req.user.id;
  if (!routeName || markers.length === 0) {
    return res.status(400).json({ message: 'Invalid route data' });
  }
  try {
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
// Beispiel für Fehlerprotokollierung im Backend
router.get('/user-routes', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const [routes] = await db.query('SELECT route_name, markers FROM routes WHERE user_id = ?', [userId]);

    // Debug-Ausgabe der Daten
    console.log('Rohdaten aus der Datenbank:', routes);

    const routesWithMarkers = routes.map(route => {
      try {
        return {
          route_name: route.route_name,
          markers: JSON.parse(route.markers),
        };
      } catch (parseError) {
        console.error('Fehler beim Parsen der Marker:', parseError.message);
        return { route_name: route.route_name, markers: [] };
      }
    });

    res.status(200).json(routesWithMarkers);
  } catch (error) {
    console.error('Error fetching routes:', error.message);
    res.status(500).json({ message: 'Failed to fetch routes', error: error.message });
  }
});



module.exports = router;
