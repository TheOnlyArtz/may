const loggerClass = require('artzlogger');
logger            = new loggerClass({timeStamp: moment(new Date).format('hh:mm:ss:')});

exports.run = (client) => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.size} users`);
    client.user.setGame('tests').catch( err => logger.error(err));
};