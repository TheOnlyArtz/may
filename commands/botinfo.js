var usageMb = process.memoryUsage().heapUsed / 1024 / 1024;
var usage = usageMb.toFixed(2);
exports.run = async(client, msg, args) => {
  const embedClass  = require('../classes/embedMessage.js');
  let = embedMessage      = new embedClass(msg)

  const moment = require('moment');
  const ms = require('ms')
  let DiscordMoji = client.guilds.get("345948633184862218").emojis.find('name', 'discord');
  let SocialMoji = client.guilds.get("345948633184862218").emojis.find('name', 'social');
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
    },
    {
      title : `💻Process:`,
      content : `**Online since:** ${ms(client.uptime, { long: true })}\n\
**Memory Usage:** ${usage} MB\n\
**Operation System:** ${require('os').platform()}`,
      inline: true
    },
    {
      title : `${SocialMoji}Social`,
      content : `**Total Guilds:** ${client.guilds.size}\n\
**Total Users:** ${client.users.filter(i => !i.bot).size}\n\
**Total Bots:** ${client.users.filter(i => i.bot).size}`,
      inline: true
    }
    ],
    color     : 0x17b8b3,
    thumbnail : client.user.displayAvatarURL,
    footer    : `Requested by ${msg.author.username} | ${moment(new Date).format('DD/MM/YYYY [at] hh:mm:ss a')}`
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
