const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    const { email, password } = req.body;
    try {
      const user = await authService.register(email, password);
      res.status(201).json({ message: 'User registered', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const { token } = await authService.login(email, password);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();
