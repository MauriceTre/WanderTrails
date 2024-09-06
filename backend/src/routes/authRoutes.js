const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

// Registrierung
router.post('/register', async (req, res) => {
  const { username, email, password, age, location } = req.body;
  try {
    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // User in der Datenbank speichern
    await db.query('INSERT INTO users (username, email, password, age, location) VALUES (?, ?, ?, ?, ?)', 
                   [username, email, hashedPassword, age, location]);

    // Neuen Benutzer abrufen, um ID zu bekommen
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    // JWT-Token erstellen
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ message: 'User successfully created', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // User nach E-Mail suchen
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Passwort vergleichen
    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // JWT-Token erstellen
    const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
