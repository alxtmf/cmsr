const { ViberBot } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').viber;

const bot = new ViberBot({
  accessToken: config.accessToken,
});

bot.onEvent(async context => {
  if (context.event.isMessage) {
    await context.sendText('Hello World');
  }
});

const server = createServer(bot);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('server is running on 5000 port...');
});
