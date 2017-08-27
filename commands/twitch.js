const https = require('https');
const Discord = require('discord.js');
const config = require('../config/config.json');
const twitchClass = require('../classes/twitch.js');

const twitch = new twitchClass(config.CLIENTID);
exports.run = async (client, msg, args) => {
    if (!args[0]) {
        return msg.channel.send('Please give a valid argument.');
    }
    let arg = args[0].toLowerCase();
    if (arg === 'register') {
        if (!args[1]) {
            return msg.channel.send('No valid arguments given');
        }
        try {
            let stat = await twitch.register(args[1]);
            if (stat.body.status !== 404) {

                let row = await r.table('livestreams').filter({guildID: msg.guild.id}).run();

                if (!row[0].streams) return msg.channel.send('You have stream announcements turned off. Turn them on to add streamers.');
                let p =  row[0].livestreams;
                let check = p.filter(o => o.name === args[1]);
                if (check[0]) return msg.channel.send("That streamer is already added!");

                let appendToArray = (table, uArray, doc) => r.table(table)
                    .filter({guildID: msg.guild.id})
                    .update(object => ({ [uArray]: object(uArray)
                        .default([]).append(doc) }))
                    .run();
                appendToArray('livestreams', 'livestreams', {
                    game: null,
                    views: null,
                    image: null,
                    mature: null,
                    lang: null,
                    name: args[1],
                    url: null,
                    online: false
                });
                msg.channel.send(`I added ${args[1]} to the list`)
            } else {
                msg.channel.send('You tried to add a non valid twitch channel!')
            }
        } catch (err) {
            msg.channel.send('You tried to add a non valid twitch channel!')
        }
    } else if (arg === 'enable') {
        if (!args[1]) {
            return msg.channel.send('No valid arguments given');
        } else if (msg.mentions.channels.first()) {
            let row = await r.table('livestreams').filter({guildID: msg.guild.id}).run();
            if (row[0].streams) {
                r.table('livestreams').filter({guildID: msg.guild.id}).update({channelID: msg.mentions.channels.first().id}).run();
                msg.channel.send('You already enabled the stream announcements, I updated the channel for you :)')
            } else {
                r.table('livestreams').filter({guildID: msg.guild.id}).update({channelID: msg.mentions.channels.first().id, streams: true}).run();
                msg.channel.send('I enabled stream announcements for you!')
            }
        } else {
            msg.channel.send('Please mention a channel in which you want the announcements.')
        }

    } else if (arg === 'remove') {
        if (!args[1]) {
            return msg.channel.send('No valid arguments given');
        } else {
            let row = await r.table('livestreams').filter({guildID: msg.guild.id}).run();
            let p =  row[0].livestreams;
            let check = p.filter(o => o.name === args[1]);
            if (!check[0]) return msg.channel.send("That streamer is not added");
            function findInd(element) {
                return element.name === args[1];
            }
            let appendToArray = (table, uArray) => r.table(table)
                .filter({guildID : msg.guild.id})
                .update(object => ({ [uArray]: object(uArray)
                    .default([]).deleteAt(p.findIndex(findInd)) }))
                    .run();
            appendToArray('livestreams', 'livestreams');
            msg.channel.send(`Removed streamer \`${args[1]}\``)
        }

    } else if (arg === 'disable') {
        let row = await r.table('livestreams').filter({guildID: msg.guild.id}).run();
        if (row[0].streams) {
            r.table('livestreams').filter({guildID: msg.guild.id}).update({channelID: null, streams: false, livestreams : []}).run();
            msg.channel.send('I disabled stream announcements (all streamers will be removed).')
        } else {
            msg.channel.send('Stream announcements are already disabled')
        }
    } else if (arg === 'list') {
        let row = await r.table('livestreams').filter({guildID: msg.guild.id}).run();
        let arr = [];
        for (let i = 0; i < row[0].livestreams.length; i++) {
            arr.push(row[0].livestreams[i].name);
        }
        msg.channel.send('All streamers:\n' + arr.join('\n'), {code: true})
    } else {
        return msg.channel.send('No valid arguments given');
    }
};

exports.help = {
    category: 'util',
    usage: '[register/enable/remove/disable] [stream:only needed with register & remove/channel:Used for enable]',
    description: 'Enabled and add Twitch streams',
    detail: 'Enable: Add the channel where you want to receive stream announcements | Register: Add a new channel to the announcements | Remove: Remove a channel from announcements | Disable: Disable the function (default)',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    alias: [
        null
    ]
};
