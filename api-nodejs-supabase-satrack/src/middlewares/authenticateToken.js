const jwt = require('jsonwebtoken');
const config = require('../config/config');
const supabase = require('../supabaseClient');

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.jwtSecret, async (err, user) => {
    if (err) return res.sendStatus(403);

    try {
      const { data, error } = await supabase.auth.getUser(user.id);

      if (error || !data.user) return res.sendStatus(403);

      req.user = data.user;
      next();
    } catch (error) {
      res.sendStatus(500);
    }
  });
}

module.exports = authenticateToken;
