const cooldowns = new Set();
class cooldown {
  constructor(options) {
    this.options = options
  }

  cooldownIt(message) {
    console.log(cooldowns);
    if (cooldowns.has(message.author.id && message.guild.id)) {
         message.reply('**[COOLDOWN]** Info command has **5 Minutes** Cooldown!');
    }
    cooldowns.add(message.author.id && message.guild.id);
    setTimeout(() => {
        cooldowns.delete(message.author.id && message.guild.id);
    }, this.options.time);
  }
}

module.exports = cooldown;
