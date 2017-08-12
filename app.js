const Discord     = require('discord.js');
const client      = new Discord.Client();
const config      = require('./config/config.json');
const loggerClass = require('artzlogger');
const fs          = require('fs');
logger            = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')});
const handler     = (err) => {logger.error(err)};
client.login(config.TOKEN).catch(handler);

let alias = {};

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    let commandIndex = 0;
    files.forEach(file => {
        let
            info = require('./commands/' + file),
            helpName = file.split('.')[0],
            alias2 = info.help.alias;

        for (alia of alias2) {
            alias[alia] = helpName;
        }
        logger.info(`${commandIndex + 1}). ` + 'Loaded ' + helpName + ` successfuly`)
    });
});


fs.readdir('./events/', (err, files) => {
    if (err) return handler(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});

// We should put this in an own file later