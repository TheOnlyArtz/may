const Discord = require('discord.js');
const ms = require('ms');
const update = require('../functions/modhistory.js');
const timer = require('../functions/rethinkTimers.js')
exports.run = async (client, msg, args) => {
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

    const embed = new Discord.RichEmbed()
        .setColor(0xC65E57)
        .setAuthor('Muted ' + toBanUsr.tag, client.user.avatarURL)
        .setDescription(`Muted User: \`${toBanUsr.tag} (${toBanUsr.id})\`\nMuted by: \`${msg.author.tag} (${msg.author.id})\`\nDuration: \`${duration}\`\nReason: \`${reason}\``)
        .setTimestamp();

    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});

    msg.guild.member(toBanUsr).addRole(role).catch(logger.error);
    // TODO: Add the time for the mute to a database for time

    update('muteCount', msg.guild.id, toBanUsr.id);
    timer(ms(args[1]), 'timers', toBanUsr.id, 'mute', msg.guild.id);
};

exports.help = {
    category: 'moderation',
    usage: '[time:time or permanent] [reason:optional]',
    description: 'I will be sure to shut their mouth',
    detail: 'When using mute the bot will mute the selected user, for the time you choose(optional)',
    botPerm: ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm: ['MUTE_MEMBERS'],
    example: '@user#3476 15min This is the reason.',
    alias: [
        null
    ]
};
