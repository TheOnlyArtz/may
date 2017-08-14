const Discord = require('discord.js')
const ms = require('ms')
exports.run = async(client, msg, args) => {
  const embedClass  = require('../classes/embedMessage.js');
  let embedMessage = new embedClass(msg)
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  */
  const target = msg.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = msg.content.split(' ').slice(2).join(' ');
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None';
  } else {
    Freason = reason;
  }

  if (!target) {
    return msg.channel.send('Please mention someone.');
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(`Softbanned ${target.username}`, client.user.avatarURL)
  .setDescription(`\`\`\`\n
Target   : ${target.username} [${target.id}]\n\
Moderator: ${msg.author.username} [${msg.author.id}]\n\
Reason   : ${Freason}
\`\`\``)
  .setColor(0x58c75f)

  if (!mayLog) {
    msg.channel.send({embed})

  } else if (mayLog) {
    mayLog.send({embed})
  }

  let backInvite = msg.channel.createInvite({
    temporary: false,
    maxAge   : 0,
    maxUses  : 0
  }).then(link => {
    target.send(`Hey :wave:, Just want to let you know that you got softbanned, reason: ${Freason}\n\
You can comeback to the server now! ${link}\מ`)
  })
    .catch(logger.error)
  setTimeout(function () {
    msg.guild.ban(target, {
      days  : 7
    })
  }, 1900);

  setTimeout(() => {
    msg.guild.unban(target);
  }, 3000);
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permant] [reason:optional]',
    description: 'I will ban someone',
    detail     : 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'BAN_MEMBERS', 'CREATE_INSTANT_INVITE'],
    authorPerm : ['BAN_MEMBERS'],
    alias      : [
        'sban'
    ]
};
