exports.run = async(client, msg, args) => {
  const ms = require('ms')
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  * @var {duration} @type {String} Punishment-Duration
  */
  const target = msg.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = msg.content.split(' ').slice(2).join(' ');
  const duration = msg.content.split(' ')[1];
  const mayLog = msg.guild.channels.find('name', 'may-log');

  let Freason;
  if (!reason) {
    Freason = 'None'
  } else {
    Freason = reason;
  }

  let Ftime;
  if (duration === 'permant') {
    Ftime = 'permant'
  } else {
    Ftime = ms(duration)
  }

  console.log(Ftime, Freason);
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permant] [reason:optional]',
    description: 'I will be sure to shut their mouth',
    detail     : 'When using mute the bot will mute the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm : ['SEND_MESSAGES', 'MUTE_MEMBERS'],
    alias      : [
        null
    ]
};
