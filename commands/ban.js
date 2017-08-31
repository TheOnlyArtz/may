const Discord = require('discord.js');
const ms = require('ms');
const embedClass = require('../classes/embedMessage.js');
const update = require('../functions/modhistory.js');
const timer = require('../functions/rethinkTimers.js')


exports.run = async (client, msg, args) => {
    let embedMessage = new embedClass(msg);
    const toBanUsr = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
    const role = msg.guild.roles.find('name', 'may-muted');

    let reason;
    let duration;
    if (!args[1]) {
        duration = 'permanent';
        reason = 'None';
    } else if (args[1].match(/\d{1,2}(hour|h|hours|second|sec|s|seconds|d|days|day)\b/)) {
        duration = ms(ms(args[1]), {long: true});
        reason = args.slice(2).join(' ') ? args.slice(2).join(' ') : 'None';
    } else {
        duration = 'permanent';
        reason = args.slice(1).join(' ');
    }

    if (toBanUsr === client.user || !toBanUsr) {
        return msg.reply('Please mention someone.');
    }

    const mayLog = msg.guild.channels.find('name', 'may-log');

    if (msg.guild.member(toBanUsr).bannable === false) {
        return embedMessage.descEmbed({
            type: 'desc',
            content: `🔒 Cannot ban\n**Reason:** Privilege is too low`,
            color: 0x6E1C39
        });
    }

    const embed = new Discord.RichEmbed()
        .setColor(0xC65E57)
        .setAuthor('Banned ' + toBanUsr.tag, client.user.avatarURL)
        .setDescription(`Banned User: \`${toBanUsr.tag} (${toBanUsr.id})\`\nBanned by: \`${msg.author.tag} (${msg.author.id})\`\nDuration: \`${duration}\`\nReason: \`${reason}\``)
        .setTimestamp();

    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});

    try{await msg.guild.ban(toBanUsr, {days: 7})} catch (e) {logger.error(e)}

    update('banCount', msg.guild.id, toBanUsr.id);
    
    if (args[1].match(/[0-9]/g)) {
      timer(ms(args[1]), 'timers', toBanUsr.id, 'ban', msg.guild.id);
    }
};

exports.help = {
    category: 'moderation',
    usage: '[time:time or permanent] [reason:optional]',
    description: 'I will ban someone',
    detail: 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm: ['SEND_MESSAGES', 'BAN_MEMBERS'],
    authorPerm: ['BAN_MEMBERS'],
    example: '@user#5743 15min This is the reason.',
    alias: [
        null
    ]
};
