const cooldowns = new Set();
const ms = require('ms');
class cooldown {
    constructor(options) {
        this.options = options
    }

  cooldownIt(message) {
      logger.debug('coolshit2 \n' + JSON.stringify(cooldowns));
      let cd = {id: message.author.id, guild: message.guild.id};
      logger.debug(JSON.stringify(cd));
      if (cooldowns.has(cd)) {
          logger.debug('coolshit \n' + JSON.stringify(cooldowns));
          message.reply(`**[COOLDOWN]** Info command has **${time} seconds** Cooldown!`);
          return false;
      }
      cooldowns.add(cd);
      setTimeout(() => {

          logger.debug('coolshit3 \n' +  JSON.stringify(cooldowns));
          cooldowns.delete(cd);
      }, ms(this.options.time));
      return true
  }
}

module.exports = cooldown;
