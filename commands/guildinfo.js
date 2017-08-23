const Discord = require('discord.js');
const moment = require('moment');
exports.run = async (client,msg,args) => {

    if (!msg.guild.available) return msg.channel.send('Discord API Error');
    let guild = msg.guild;
    let name = guild.name;
    let createdAt = moment(guild.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    let channels = guild.channels.size;
    let owner = guild.owner.user.tag;
    let memberCount = guild.memberCount;
    let large = guild.large;
    let iconUrl = guild.iconURL;
    let region = guild.region;
    let afk = msg.guild.channels.get(guild.afkChannelID) === undefined ? 'None' : msg.guild.channels.get(guild.afkChannelID).name;

    const embed = new Discord.RichEmbed()
        .setTitle('Guild Information')
        .addField('Channels', `Channel Count: **${channels}**\nAFK Channel: **${afk}**`, true)
        .addField('Members', `Member Count: **${memberCount}**\nOwner: **${owner}**\nOwner ID: **${guild.owner.id}**`, true)
        .addField('More', `Created at: **${createdAt}**\nLarge Guild?: **${large ? 'Yes' : 'No'}**\nRegion: **${region}**`)
        .setThumbnail(iconUrl)
        .setFooter('May')
        .setTimestamp();

    msg.channel.send({embed})
};

exports.help = {
    category   : 'util',
    usage      : false,
    description: 'Displays Information',
    detail     : 'Displays Information about the guild you execute this command in',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        'gi'
    ]
};
