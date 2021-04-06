const tmi = require('tmi.js');
const queries = require('../../db/queries');

function listenTwitchChat() {
  const client = new tmi.Client({
    options: { debug: process.env.DEBUG_TWITCH === 'true' },
    connection: { reconnect: true },
    channels: [process.env.TWITCH_CHANNEL_NAME]
  });

  client.connect();

  client.on('message', (channel, tags, message, self) => {
    if (self) return;

    if (message.match(/^happiness is /i)) {
      console.log(JSON.stringify(tags, null, 2));
      console.log(`@${tags.username} - ${message}`);
      queries.createMessage({
        message_id: tags.id,
        username: tags.username,
        display_name: tags['display-name'],
        channel_id: tags['room-id'],
        avatar: '',
        content: message,
        created_at: new Date(),
      });
    }
  });
}

module.exports = listenTwitchChat;
