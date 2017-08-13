exports.run = async(client, msg, args) => {
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {dole} @type {Object} role-Object for mutes
  * @var {reason} @type {String} Punishment-Reason
  * @var {duration} @type {String} Punishment-Duration
  */
  const target = message.mentions.users.first();
  const role = msg.guild.roles.find('name', 'may-muted');
  const reason = message.content.split(' ').slice(2).join(' ');
  const duration = message.content.split(' ')[1];
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:optional] [reason:optional]',
    description: 'I will be sure to shut their mouth',
    detail     : 'When using mute the bot will mute the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm : ['SEND_MESSAGES', 'MUTE_MEMBERS'],
    alias      : [
        null
    ]
};
