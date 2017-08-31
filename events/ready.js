const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
const punishmentChecker = require('../functions/punishmentInterval');
const remindersChecker = require('../functions/reminderInteral');
const streamersChecker = require('../functions/twitch.js');
exports.run = async client => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.filter(i => !i.bot).size} users`);
    client.user.setPresence({game: {name: 'tests', type: 0}}).catch(err => logger.error(err));

    punishmentChecker(client);
    remindersChecker(client);
    streamersChecker(client);
};
