const db = require('../db');
const bcrypt = require('bcrypt');

const User = {
  create: async (username, email, password, age, location) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = 'INSERT INTO users (username, email, password, age, location) VALUES (?, ?, ?, ?, ?)';
      const values = [username, email, hashedPassword, age, location];
      await db.promise().query(query, values);
      return { message: 'User successfully created' };
    } catch (error) {
      throw error;
    }
  },

  findByEmail: async (email) => {
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      const [rows] = await db.promise().query(query, [email]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  },

  findById: async (userId) => {
    try {
      const query = 'SELECT username, age, location FROM users WHERE id = ?';
      const [rows] = await db.promise().query(query, [userId]);
      return rows[0]; 
    } catch (error) {
      throw error;
    }
  },

  saveRoute: async (userId, route) => {
    try {
      const query = 'INSERT INTO routes (user_id, route_data) VALUES (?, ?)';
      const values = [userId, JSON.stringify(route)];
      await db.promise().query(query, values);
      return { message: 'Route successfully saved' };
    } catch (error) {
      throw error;
    }
  },

  getRoutes: async (userId) => {
    try {
      const query = 'SELECT * FROM routes WHERE user_id = ?';
      const [rows] = await db.promise().query(query, [userId]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = User;

