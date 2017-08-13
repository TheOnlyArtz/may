const Discord = require('discord.js')
class embedMessage {
  constructor(options, msg) {
    this.options = options
    this.message = msg
  }

  descEmbed() {
    if (this.options.type === "desc" ) {
      if (!this.options.content) {
        throw Error ('You did not specify the text inside the constructor options.')
      } else {
        const embed = new Discord.RichEmbed()
        .setDescription(this.options.content)
        this.message.channel.send({embed})
      }
    } else {
      throw Error ('You chose descEmbed but your option does not have "desc" in it.')
    }
  }
}
module.exports = embedMessage;
