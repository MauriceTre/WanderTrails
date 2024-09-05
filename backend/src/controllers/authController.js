const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const User = require('../models/User');
exports.register = async (req, res) => {
    const { username, email, password, age, location } = req.body;
    try {
      const user = await User.create(username, email, password, age, location);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error registering user' });
    }
  };
  
  exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ error: 'Error logging in' });
    }
  };
  
  exports.getDashboard = async (req, res) => {
    const userId = req.user.id;
    try {
      const routes = await User.getRoutes(userId);
      res.json({ routes });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching dashboard data' });
    }
  };