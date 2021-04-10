const db = require('./connection');

module.exports = {
  getMessages() {
    // TODO: pagination...
    // SELECT * FROM messages ORDER BY random()
    return db('messages').orderByRaw('random()');
  },
  async createMessage(message) {
    // DO THE VALIDATION
    const [createdMessage] = await db('messages')
      .insert(message)
      .returning('*');
    return createdMessage;
  }
};
