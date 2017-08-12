const Discord     = require('discord.js');
const client      = new Discord.Client();
const config      = require('./config/config.json');
const loggerClass = require('artzlogger');
const fs          = require('fs');
const handler     = (err) => {console.error(err)};
logger            = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')});
client.login(config.TOKEN).catch(handler);

client.on('ready', async () => {
  logger.info('May has now been connected!');
  logger.debug(`May's ID: ${client.user.id}`);
  logger.debug(`May's Tag: ${client.user.tag}`);
});

let alias = {};

fs.readdir('./commands/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let
            info = require('./commands/' + file),
            helpName = file.split('.')[0],
            alias2 = info.help.alias;

        for (alia of alias2) {
            alias[alia] = helpName;
        }
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
/*

We should put this in an own file later

 */
client.on('message', async msg => {
    /*
    Return if author is a client or the content of the message does not include a command
     */
    if (msg.author.client || !msg.content.startsWith(config.PREFIX)) return;
    /*
    Creating the arguments array with the suffix of the content
     */
    const args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);
    /*
    Defining the content from the message arguments
     */
    const command = args.shift().toLowerCase();
    /*
    Checking if the command has the potential to be a command
     */
    if (!/^[a-z0-9]+$/i.test(command)) {
        let msgToDel = await msg.channel.send(`:x: ${config.PREFIX}${command} is not a command`);
        return msgToDel.delete(5000);
    }
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
            let msgToDel = await msg.channel.send(`:x: ${config.PREFIX}${command} is not a command`);
            msgToDel.delete(5000);
        }

    }
});
