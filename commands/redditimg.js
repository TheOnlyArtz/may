const Discord = require('discord.js');
const sf = require('snekfetch');
const cooldown = require('../functions/cooldown.js');
exports.run = async (client,msg,args) => {
    if (!args[0]) return msg.channel.send('Please give a valid subreddit');
    if (cooldown(msg, 'redditimg', 30, 'This command has a cooldown of **30 Seconds**!')) {
        sf.get(`https://www.reddit.com/r/${args[0]}/random.json?limit=1`).then(res => {
            if (res.body[0].data.children[0].data.over_18 && res.body[0].data.children[0].data.preview.images[0].source.url) {
                const embed = new Discord.RichEmbed()
                    .setTitle('Random Image from ' + args[0])
                    .setDescription(`The Subreddit returned a NSFW image. [Click here to view it](${res.body[0].data.children[0].data.preview.images[0].source.url})`);

                msg.channel.send({embed});
            } else if (res.body[0].data.children[0].data.preview.images[0].source.url) {
                msg.channel.send('Random Image\n' + res.body[0].data.children[0].data.preview.images[0].source.url)
            } else {
                msg.channel.send('The API returned a non valid response.')
            }
        }).catch(e => {
            logger.error('Reddit Image Error:' + e);
            msg.channel.send('Not a valid subreddit')
        })
    }
};

exports.help = {
    category: 'util',
    usage: '[subreddit]',
    description: 'Get Image from subreddit',
    detail: 'Get a random image from a subreddit',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    alias      : [
        'redimg'
    ]
};