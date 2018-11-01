const { ViberBot, ViberHandler } = require('bottender');
const { createServer } = require('bottender/express');

const config = require('./bottender.config').viber;

const bot = new ViberBot({
  accessToken: config.accessToken,
});

const handler = new ViberHandler()
    .onDelivered(() => {
        console.log('delivered');
    })
    .onSeen(() => {
        console.log('seen');
    })
    .onFailed(() => {
        console.log('failed');
    })
    .onText(/yo/i, async context => {
        await context.sendText('Hi there!');
    })
    .onEvent(async context => {
        try {
            //await context.sendText("I don't know what you say.");
            await context.sendText("Выберите действие", {
                keyboard: {
                    Type:"keyboard",
                    DefaultHeight: true,
                    BgColor: '#FFFFFF',
                    Buttons: [
                        {
                            Columns: 1,
                            Rows: 1,
                            BgColor: '#2db9b9',
                            Text: 'Узнать задолженность',
                            TextVAlign: 'middle',
                            TextHAlign: 'center',
                            TextOpacity: 60,
                            TextSize: 'regular',
                        },
                    ],
                },
            })
        } catch (e) {
            console.log(e);
        }

    })
    .onError(async context => {
        await context.sendText('Something wrong happened.');
    });

bot.onEvent(handler);

const server = createServer(bot);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('server is running on 5000 port...');
});
