const Discord     = require('discord.js');
const client      = new Discord.Client();
const config      = require('./config/config.json');
const loggerClass = require('artzlogger');
const fs          = require('fs');
logger            = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')});
const handler     = (err) => {logger.error(err)};
client.login(config.TOKEN).catch(handler);


fs.readdir('./events/', (err, files) => {
    if (err) return handler(err);
    let commandIndex = 1;
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split('.')[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
        logger.info(`Event ${commandIndex++}). ` + `${chalk.cyan('Loaded ')}` + file + ` successfully ${chalk.cyan('[Event]')}`)
    });
    logger.info(chalk.cyan(`Loaded total ${commandIndex - 1} Events!`))

});

process.on('unhandledRejection', err => logger.error(err));
// process.on('uncaughtException', err => logger.error(err));
