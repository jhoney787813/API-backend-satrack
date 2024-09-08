const messageRepository = require('../repositories/messageRepository');

class MessageService {
  async postMessage(userId, content) {
    if (!content || typeof content !== 'string') {
      throw new Error('Invalid content');
    }
    return await messageRepository.createMessage(userId, content);
  }
}

module.exports = new MessageService();
