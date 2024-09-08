const messageService = require('../services/messageService');

class MessageController {
  async postMessage(req, res) {
    const { content } = req.body;
    const userId = req.user.id;
    try {
      const message = await messageService.postMessage(userId, content);
      res.status(201).json({ message: 'Message posted', data: message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new MessageController();
