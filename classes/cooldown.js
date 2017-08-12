const cooldowns = new Set();
const ms = require('ms')
class cooldown {
  constructor(options) {
    this.options = options
  }

  cooldownIt(message) {
    console.log(cooldowns);
    if (cooldowns.has(message.author.id && message.guild.id)) {
         message.reply('**[COOLDOWN]** Info command has **5 Minutes** Cooldown!');
         return false;
    }
    cooldowns.add(message.author.id && message.guild.id);
    setTimeout(() => {
        cooldowns.delete(message.author.id && message.guild.id);
    }, this.options.time);
    return true
  }
}

module.exports = cooldown;
