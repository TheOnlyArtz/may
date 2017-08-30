
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);

let check = async (bot) => {
    setInterval(() => {
        let queue = await r.table('livestreams').getAll('NONE', {index : 'guildID'});
        
    }, 7 * 60000);
};

module.exports = check;
