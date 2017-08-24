const moment = require('moment');
const discord = require('discord.js');

exports.run = async (client, msg, args) => {
    if (!args[0]) {
        return msg.channel.send('Please mention someone or use their ID for the command');
    }
    let userCom = client.users.get(args[0]) || msg.mentions.users.last();
    if (!userCom) {
        return msg.channel.send('Please mention someone or use their ID for the command');
    }
    let memberCom = await msg.guild.fetchMember(userCom);
    let created = moment(userCom.createdAt).format('MMMM Do YYYY, h:mm:ss a');
    let joined = moment(memberCom.joinedAt).format('MMMM Do YYYY, h:mm:ss a');
    let game = userCom.presence.game ? userCom.presence.game.name : 'None';
    let nickname = !memberCom.nickname ? 'None' : memberCom.nickname;
    let avatar = userCom.displayAvatarURL;
    let uid = userCom.id;
    let tag = userCom.tag;
    let isBot = userCom.bot ? 'Yes' : 'No';
    let status = '';
    if (userCom.presence.status === 'online') {
        status = 'Online';
    } else if (userCom.presence.status === 'offline') {
        status = 'Offline';
    } else if (userCom.presence.status === 'idle') {
        status = 'Idle';
    } else if (userCom.presence.status === 'dnd') {
        status = 'Do not disturb';
    }
    const embed = new discord.RichEmbed()
        .setTitle('Userinfo | ' + userCom.username)
        .setThumbnail(avatar)
        .setDescription(`[Click here for the Avatar Link](${avatar})`)
        .addField('General Information', `Tag: **${tag}**\nID: **${uid}**\nGame: **${game}**\nStatus: **${status}**\nCreated at: **${created}**\nIs a Bot?: **${isBot}**`)
        .addField('Guild Spec. Information', `Nickname: **${nickname}**\nJoined at: **${joined}**\n`)
        .setFooter('May')
        .setColor('#19A6D4')
        .setTimestamp();

    msg.channel.send({embed});
};

exports.help = {
    category: 'util',
    usage: '[user]',
    description: 'Get info about a user',
    detail: `Shows detailed information about a user`,
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: '@user#3478',
    alias: [
        null
    ]
};
