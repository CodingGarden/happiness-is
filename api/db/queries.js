const db = require('./connection');

module.exports = {
  async createMessage(message) {
    // DO THE VALIDATION
    const [createdMessage] = await db('messages')
      .insert(message)
      .returning('*');
    return createdMessage;
  }
};
