const Discord = require('discord.js');
exports.run = async (client,msg,args) => {
    const toWarn = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();
    const mayLog = msg.guild.channels.find('name', 'may-log');
    let reason;
    let duration;
    if (!args[1]){
        reason = args.slice(2).join(' ') ? args.slice(2).join(' ') : 'None';
    } else {
        reason = args.slice(1).join(' ');
    }

    if (!toWarn || toWarn === client.user) {
        return msg.channel.send('Please mention someone.')
    }

    const embed = new Discord.RichEmbed()
        .setColor(0x23d992)
        .setAuthor(`Warned ${toWarn.tag}`)
        .setDescription(`**Warned User:** ${toWarn.tag} \`(${toWarn.id})\`\n**Warned By** ${msg.author.tag} \`(${msg.author.id})\`\n**Reason:** ${reason}`);
    mayLog ? mayLog.send({embed}) : msg.channel.send({embed});
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