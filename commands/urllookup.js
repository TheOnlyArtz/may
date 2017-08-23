const regTest = new RegExp(
    "^" +
    "(?:(?:https?|ftp)://)" +
    "(?:\\S+(?::\\S*)?@)?" +
    "(?:" +
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
    "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
    "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
    "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
    "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
    "|" +
    "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
    "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
    "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
    "\\.?" +
    ")" +
    "(?::\\d{2,5})?" +
    "(?:[/?#]\\S*)?" +
    "$", "i"
);
const sf = require('snekfetch');
const Discord = require('discord.js');
const cooldown = require('../functions/cooldown.js');
exports.run = async (client, msg, args) => {
    if (!args[0] || !regTest.test(args[0])) return msg.channel.send('Please give a valid URL');
    if (cooldown(msg, 'urllookup', 60, 'This command has a cooldown of **1 Minute**!')) {
        sf.get(args[0]).then(res => {
            let protocol = res.request.connection._httpMessage.agent.protocol + '//';
            let domain = res.request.connection._httpMessage._headers.host;
            let path = res.request.connection._httpMessage.path;

            const embed = new Discord.RichEmbed()
                .setTitle('URL Lookup')
                .addField('Status Code', res.request.connection._httpMessage.res.statusCode, true)
                .addField('Original URL', args[0], true)
                .addField('URL Endpoint', protocol + domain + path, true)
                .setTimestamp()
                .setFooter('May');
            msg.channel.send({embed})
        }).catch(e => {
            let protocol = e.request.connection._httpMessage.agent.protocol + '//';
            let domain = e.request.connection._httpMessage._headers.host;
            let path = e.request.connection._httpMessage.path;

            const embed = new Discord.RichEmbed()
                .setTitle('URL Lookup')
                .addField('Status Code', e.request.connection._httpMessage.res.statusCode, true)
                .addField('Original URL', args[0], true)
                .addField('URL Endpoint', protocol + domain + path, true)
                .setTimestamp()
                .setFooter('May');

            msg.channel.send({embed})
        });
    }

};

exports.help = {
    category   : 'util',
    usage      : '[url]',
    description: 'Gives info where an URL leads to',
    detail     : `Gives info to which website and URL leads to`,
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    example    : "https://google.com/",
    alias      : [
        'urllu',
        'lookup',
        'ulu'
    ]
};
