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
  advanced(options) {
    if (!options) {
      throw Error('You must specify at list one option, list {desc, footer, thumbnail, title, author fields[field1, content, field2, content]}')
    }
    if (!options.fields[0]) {
      throw Error('You must add atleast 1 field')
    }
    const embed = new Discord.RichEmbed();
    for (let i = 0; i < options.fields.length; i++) {
      embed.addField(options.fields[i].title, options.fields[i].content)
    }
    if (options.desc) {
      embed.setDescription(options.desc)
    }
    if (options.footer) {
      embed.setFooter(options.footer)
    }
    if(options.title) {
      embed.setTitle(options.title)
    }
    if (options.thumbnail) {
      embed.setThumbnail(options.thumbnail)
    }
    this.message.channel.send({embed})
  }
}
module.exports = embedMessage;
