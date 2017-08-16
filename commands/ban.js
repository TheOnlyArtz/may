const Discord = require('discord.js');
const ms = require('ms');
const embedClass  = require('../classes/embedMessage.js');
exports.run = async(client, msg, args) => {
  let embedMessage = new embedClass(msg)
    const toBanUsr = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
    const role = msg.guild.roles.find('name', 'may-muted');
    let reason;
    let duration;


    if (msg.guild.member(toBanUsr).bannable === false) {
      return embedMessage.descEmbed({
        type : "desc",
        content : `🔒 Cannot kick\n**Reason:** Privilege is too low`,
        color   : 0x6e1c39
      })
    }
    if (!args[1]){
        duration = 'permanent';
        reason = 'None'
    } else if (args[1].match(/\d{1,2}(hour|h|hours|second|sec|s|seconds|d|days|day)\b/)) {
        duration = ms(ms(args[1]), {long : true});
        reason = args.slice(2).join(' ') ? args.slice(2).join(' ') : 'None';
    } else {
        duration = 'permanent';
        reason = args.slice(1).join(' ');
    }
    const mayLog = msg.guild.channels.find('name', 'may-log');

    const embed = new Discord.RichEmbed()
        .setAuthor('Banned ' + toBanUsr.tag, client.user.avatarURL)
        .setDescription(`Punished User: \`${toBanUsr.tag} (${toBanUsr.id})\`\nPunished by: \`${msg.author.tag} (${msg.author.id})\`\nDuration: \`${duration}\`\nReason: \`${reason}\``)
        .setTimestamp();

    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});

    msg.guild.ban(toBanUsr, {
        days  : 7
    }).catch(logger.error);
    // TODO: Add the time for the ban to a database for time and add total bans the user got to a database
};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permanent] [reason:optional]',
    description: 'I will ban someone',
    detail     : 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'BAN_MEMBERS'],
    authorPerm : ["BAN_MEMBERS"],
    alias      : [
        null
    ]
};
