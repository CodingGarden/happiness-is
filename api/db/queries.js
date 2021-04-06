const db = require('./connection');

module.exports = {
  getMessages() {
    // TODO: pagination...
    return db('messages');
  },
  async createMessage(message) {
    // DO THE VALIDATION
    const [createdMessage] = await db('messages')
      .insert(message)
      .returning('*');
    return createdMessage;
  }
};
