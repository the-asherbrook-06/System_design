const AuthenticationSession = require('../models/AuthenticationSession');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const session = await AuthenticationSession.findOne({ authToken: token });
    if (!session || new Date() > session.expiresAt) {
      return res.status(401).json({ error: 'Invalid or expired token.' });
    }
    req.userId = session.userID;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = authMiddleware;