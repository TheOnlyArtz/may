/**
 * @member {Object}
 */
const sf = require('snekfetch');
const cooldown = require('../functions/cooldown.js');

exports.run = async (client, msg, args) => {
    if (cooldown(msg, 'cat', 300, 'This command has a cooldown of **5 Minutes**!')) {
        let promise = await sf.get('http://random.cat/meow');
            msg.channel.send(promise.body);
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
