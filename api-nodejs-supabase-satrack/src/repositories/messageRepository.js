const supabase = require('../supabaseClient');

class MessageRepository {
  async createMessage(userId, content) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{ user_id: userId, content }]);

    if (error) throw error;
    return data;
  }
}

module.exports = new MessageRepository();
