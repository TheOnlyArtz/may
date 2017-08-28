const Discord = require('discord.js');
const client = new Discord.Client({options: {disabledEvents: [
    'GUILD_SYNC',
    'GUILD_ROLE_CREATE',
    'GUILD_ROLE_DELETE',
    'GUILD_ROLE_UPDATE',
    'GUILD_BAN_ADD',
    'GUILD_BAN_REMOVE',
    'CHANNEL_CREATE',
    'CHANNEL_DELETE',
    'CHANNEL_UPDATE',
    'CHANNEL_PINS_UPDATE',
    'MESSAGE_DELETE',
    'MESSAGE_UPDATE',
    'MESSAGE_DELETE_BULK',
    'MESSAGE_REACTION_ADD',
    'MESSAGE_REACTION_REMOVE',
    'MESSAGE_REACTION_REMOVE_ALL',
    'USER_UPDATE',
    'USER_NOTE_UPDATE',
    'USER_SETTINGS_UPDATE',
    'PRESENCE_UPDATE',
    'VOICE_STATE_UPDATE',
    'TYPING_START',
    'VOICE_SERVER_UPDATE',
    'RELATIONSHIP_ADD',
    'RELATIONSHIP_REMOVE'
]}});
global.config = require('./config/config.json');
global.r = require('rethinkdbdash')({servers : [{host: config.rethinkhost}]})
.db('May')
const loggerClass = require('artzlogger');

const fs = require('fs');
const moment = require('moment');

global.logger = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')});
const handler = err => {
    logger.error(err);
};

client.login(config.TOKEN).catch(handler);
client.on('warn', info => {logger.warn(info)});
client.on('error', info => {logger.error(info)});

fs.readdir('./events/', (err, files) => {
    if (err) {
        return handler(err);
    }
    let commandIndex = 1;
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
        logger.info(`Event ${commandIndex++}). ` + `${chalk.cyan('Loaded ')}` + file + ` successfully ${chalk.cyan('[Event]')}`);
    });
    logger.info(chalk.cyan(`Loaded total ${commandIndex - 1} Events!`));
});

process.on('unhandledRejection', err => logger.error(err));
