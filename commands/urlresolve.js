const sf = require('snekfetch');
const Discord = require('discord.js');
const cooldown = require('../functions/cooldown.js');
exports.run = async (client, msg, args) => {
    if (!args[0] || !/^https?:\/\/goo\.gl\/\w{6,}$/.test(args[0])) return msg.channel.send('Please give a valid URL');
    if (cooldown(msg, 'urlresolve', 60, 'This command has a cooldown of **1 Minute**!')) {
        sf.get(`https://www.googleapis.com/urlshortener/v1/url?key=${require('../config/config.json').URLSHORTAPI}&shortUrl=${args[0]}`).then(res => {
            msg.delete();
            const embed = new Discord.RichEmbed()
                .addField('Short URL', args[0], true)
                .setFooter('May')
                .setTimestamp();
            if (res.body.status === 'REMOVED') {
                embed.addField('Status', 'REMOVED', true);
            } else if (res.body.status === 'MALWARE') {
                embed.addField(':x: Status', 'MALWARE', true);
                embed.addField('Resolved URL', res.body.longUrl, true)
            } else {
                embed.addField('Status', 'OK', true);
                embed.addField('Resolved URL', res.body.longUrl, true)
            }
            msg.channel.send({embed});
        }).catch(e => console.error(e));
    }

};

exports.help = {
    category   : 'util',
    usage      : '[url]',
    description: 'Gives info about a shorten URL',
    detail     : `Gives info about a goo.gl shorten URL`,
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    example    : "https://goo.gl/aSF54h",
    alias      : [
        'urlre',
        'resolve'
    ]
};
