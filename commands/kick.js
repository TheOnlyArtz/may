exports.run = (client, msg, args) => {
  /**
  * @var {target} @type {Object} user-Object to mute
  * @var {reason} @type {String} Punishment-Reason
  * @var {mayLog} @type {Object} Punishment-channel
  */

  const target = msg.mentions.users.first();
  const reason = msg.content.split(' ').slice(3).join(' ');
  const mayLog = msg.guild.channels.find('name', 'may-log');
};

exports.help = {
    category   : 'fun',
    usage      : '',
    description: 'Shows a random cat',
    detail     : `Shows you a random cat every time the command gets triggered`,
    botPerm    : ['SEND_MESSAGES', "KICK_MEMBERS"],
    authorPerm : ['SEND_MESSAGES', "KICK_MEMBERS"],
    alias      : [
        null
    ]
};
