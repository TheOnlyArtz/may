const Discord = require('discord.js')
const ms = require('ms')
exports.run = async(client, msg, args) => {
  const embedClass  = require('../classes/embedMessage.js');
  let embedMessage = new embedClass(msg)
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  * @var {duration} @type {String} Punishment-Duration
  */
  const target = msg.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = msg.content.split(' ').slice(3).join(' ');
  const duration = msg.content.split(' ')[2];
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None';
  } else {
    Freason = reason;
  }

  let Fdur;
  if (!duration.match(/\d{1,2}(hour|h|hours|second|sec|s|seconds|d|days|day)\b/)) {
    Fdur = 'permanent';
  } else {
    console.log('match');
    Fdur = ms(ms(duration), {long : true});
  }
  if (!target) {
    return msg.reply('Please mention a user for the punishment');
  }

  const embed = new Discord.RichEmbed()
  .setAuthor(`Banned ${target.username}`, client.user.avatarURL)
  .setDescription(`\`\`\`\n
Target   : ${target.username} [${target.id}]\n\
Moderator: ${msg.author.username} [${msg.author.id}]\n\
Duration : ${Fdur}\n\
Reason   : ${Freason}
\`\`\``)
  .setColor(0x58c75f)

  if (!mayLog) {
    msg.channel.send({embed})

  } else if (mayLog) {
    mayLog.send({embed})
  }


  msg.guild.ban(target, {
    days  : 7
  });
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permant] [reason:optional]',
    description: 'I will ban someone',
    detail     : 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'BAN_MEMBERS'],
    authorPerm : ['BAN_MEMBERS'],
    alias      : [
        null
    ]
};
