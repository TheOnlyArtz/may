const cooldown = require('../functions/cooldown.js');
const sf = require('snekfetch');

exports.run = (client, msg, args) => {
    if (cooldown(msg, 'cat', 300, 'This command has a cooldown of **5 Minutes**!')) {
        sf.get('http://random.cat/meow').then(r => {
            msg.channel.send(r.body);
        });
    }
};

exports.help = {
    category: 'fun',
    usage: '',
    description: 'Shows a random cat',
    detail: `Shows you a random cat every time the command gets triggered`,
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: false,
    alias: [
        null
    ]
};
