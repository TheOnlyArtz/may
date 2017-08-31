const Discord = require('discord.js');
const google = require('google');

exports.run = async (client, msg, args) => {
    const toSearch = args.join(' ');
    let links = [];
    if (!toSearch) {
        return msg.reply('Please insert something to search');
    }

    google(toSearch, async (err, res) => {
        for (let i = 0; i < 3; i++) {
            if (res.links[i].href !== null) {
                links.push('<' + res.links[i].href + '>');
            }
        }
        try {
          await msg.react('✅').
          await msg.channel.send(`**I found:**\n${links.join('\n')}`);
        } catch (e) {
          logger.error(e)
        }
    });
};

exports.help = {
    category: 'fun',
    usage: '[term]',
    description: 'Search at google',
    detail: `Look for whatever you want when you want`,
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: 'Why am I a jake pauler?',
    alias: [
        'g'
    ]
};
