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
    let commandIndex = 0
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

client.on('message', async msg => {
    // Return if author is a client or the content of the message does not include a command
    if (msg.author.client || !msg.content.startsWith(config.PREFIX)) return;
    // Creating the arguments array with the suffix of the content
    let args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);

    // Defining the content from the message arguments
    let command = args.shift().toLowerCase();

    // Checking if the command has the potential to be a command
    try {
        let commandFile = require('./commands/' + command + '.js');
            commandFile.run(client, msg, args);
    }
    catch (err) {
        if (alias[command]) {
            let commandFile = require('./commands/' + alias[command] + '.js');
                commandFile.run(client, msg, args).catch(handler);
        }
        else {
          return;
        }

    }
});
