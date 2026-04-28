const express = require('express');
const router = express.Router();
const pool = require('../db'); // Your local Postgres connection
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await pool.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "User already exists" });
  }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (user.rows.length > 0) {
    const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
    if (validPass) {
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(400).send("Invalid password");
    }
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;