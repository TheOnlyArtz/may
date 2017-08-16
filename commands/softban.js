const Discord = require('discord.js');
const ms = require('ms');
exports.run = async(client, msg, args) => {

    const toBanUsr = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
    const role = msg.guild.roles.find('name', 'may-muted');
    let reason;
    let duration;
    let link = await msg.channel.createInvite({
        temporary: false,
        maxAge   : 0,
        maxUses  : 0
    });
    if (!args[1]){
        reason = 'None'
    } else {
        reason = args.slice(1).join(' ');
    }
    const mayLog = msg.guild.channels.find('name', 'may-log');

    try {
        await toBanUsr.send(`Hey :wave:, Just want to let you know that you got soft banned, reason: \`${reason}\`\nYou can comeback to the server now! ${link}`);
    } catch (e) {
        msg.channel.send('Cannot send message to user.')
    }

    msg.guild.ban(toBanUsr, {
        days  : 7
    }).catch(logger.error);

    await msg.guild.unban(toBanUsr);

    const embed = new Discord.RichEmbed()
        .setAuthor('Soft Banned ' + toBanUsr.tag, client.user.avatarURL)
        .setDescription(`Punished User: \`${toBanUsr.tag} (${toBanUsr.id})\`\nPunished by: \`${msg.author.tag} (${msg.author.id})\`\nReason: \`${reason}\``)
        .setTimestamp();

    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});
  // TODO: add the total softbans the user got to a database

};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permanent] [reason:optional]',
    description: 'I will ban someone',
    detail     : 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'BAN_MEMBERS', 'CREATE_INSTANT_INVITE'],
    authorPerm : ['BAN_MEMBERS'],
    alias      : [
        'sban'
    ]
};
