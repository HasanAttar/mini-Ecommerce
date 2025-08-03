// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const user = new User({ username, password, role });
    await user.save();

    const token = createToken(user);
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = createToken(user);
    res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
