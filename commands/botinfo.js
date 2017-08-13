exports.run = async(client, msg, args) => {
  let DiscordMoji = msg.guild.emojis.find('name', 'discord')
  embedMessage.advanced({
    author : {
      name : `Take a look at my info`,
      pic  : client.user.displayAvatarURL
    },
    fields : [{
        title : `${DiscordMoji}My Discord Info:`,
        content: `**Username:** ${client.user.username}\n\
**Descriminator:** ${client.user.tag}\n\
**ID:** ${client.user.id}`
    }],
    thumbnail : client.user.displayAvatarURL
  })
};

exports.help = {
    category   : 'util',
    usage      : '',
    description: 'Shows bot\'s info',
    detail     : 'When using bot info you will see all the info about the bot',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : ['SEND_MESSAGES'],
    alias      : [
        null
    ]
};
