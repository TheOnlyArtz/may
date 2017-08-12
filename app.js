const Discord     = require('discord.js');
const client      = new Discord.Client();
const config      = require('./config/config.json');
const loggerClass = require('artzlogger');
logger            = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')})
client.login(config.TOKEN)

client.on('ready', async () => {
  logger.info('May has now been connected!')
  logger.debug(`May's ID: ${client.user.id}`)
  logger.debug(`May's Tag: ${client.user.tag}`)
});
