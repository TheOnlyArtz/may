const https = require('https');
const Discord = require('discord.js');
const config = require('../config/config.json');
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
exports.run = async (client,msg,args) => {
    if (!args[0]) return msg.channel.send('Please give a valid argument.');
    let arg = args[0].toLowerCase();
    if (arg === 'register') {
        if (!args[1]) return msg.channel.send('No valid arguments given');

    } else if (arg === 'enable') {
        if (!args[1]) return msg.channel.send('No valid arguments given');
        if (twitch.register(args[1])) {

        } else {

        }

    } else if (arg === 'remove') {
        if (!args[1]) return msg.channel.send('No valid arguments given');

    } else if (arg === 'disable') {

    } else {
        return msg.channel.send('No valid arguments given')
    }
};

exports.help = {
    category: 'util',
    usage: '[register/enable/remove/disable] [stream:only needed with register & remove/channel:Used for enable]',
    description: 'Enabled and add Twitch streams',
    detail: 'Enable: Add the channel where you want to receive stream announcements | Register: Add a new channel to the announcements | Remove: Remove a channel from announcements | Disable: Disable the function (default)',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    alias      : [
        null
    ]
};
