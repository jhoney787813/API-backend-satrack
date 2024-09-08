const supabase = require('../supabaseClient');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AuthService {
  async register(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data.user;
  }

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;

    const token = jwt.sign({ id: data.user.id }, config.jwtSecret, { expiresIn: '1h' });
    return { token };
  }
}

module.exports = new AuthService();
