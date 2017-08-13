const Discord = require('discord.js')
class embedMessage {
  constructor(msg) {
    this.message = msg
  }

  descEmbed(options) {
    if (!options) {
      throw Error('You must specify the options, options list {content, type}')
    }
    if (options.type === "desc" ) {
      if (!options.content) {
        throw Error ('You did not specify the text inside the constructor options.')
      } else {
        const embed = new Discord.RichEmbed()
        .setDescription(options.content)
        this.message.channel.send({embed})
      }
    } else {
      throw Error ('You chose descEmbed but your option does not have "desc" in it.')
    }
  }
}
module.exports = embedMessage;
