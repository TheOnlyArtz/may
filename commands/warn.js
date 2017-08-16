exports.run = async (client,msg,args) => {
  const toBanUsr = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
  let reason;
  let duration;
  if (!args[1]){
      duration = 'permanent';
      reason = 'None'
      reason = args.slice(2).join(' ') ? args.slice(2).join(' ') : 'None';
  } else {
      reason = args.slice(1).join(' ');
  }

  const embed = new Discord.RichEmbed()
  .addField('')
};

exports.help = {
    category: 'moderation',
    usage: '[mention:user] [reason:string]',
    description: 'Warn someone',
    detail: 'Use warn to warn someone who passes the rules.',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    alias      : [
        'wa'
    ]
};
