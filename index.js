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
        //await context.sendText("I don't know what you say.");
        await context.sendText("Выберите действие", {
            keyboard: {
                DefaultHeight: true,
                BgColor: '#FFFFFF',
                Buttons: [
                    {
                        Columns: 1,
                        Rows: 1,
                        BgColor: '#2db9b9',
                        //BgMediaType: 'gif',
                        //BgMedia: 'http://www.url.by/test.gif',
                        //BgLoop: true,
                        //ActionType: 'open-url',
                        //ActionBody: 'www.tut.by',
                        //Image: 'www.tut.by/img.jpg',
                        Text: 'Узнать задолженность',
                        TextVAlign: 'middle',
                        TextHAlign: 'center',
                        TextOpacity: 60,
                        TextSize: 'regular',
                    },
                ],
            },
        })
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
