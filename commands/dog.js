/**
 * @member {Object}
 */
const sf = require('snekfetch');
const cooldown = require('../functions/cooldown.js');

exports.run = (client, msg, args) => {
    if (cooldown(msg, 'dog', 300, 'This command has a cooldown of **5 Minutes**!')) {
        sf.get('http://random.dog/woof.json').then(r => {
            if (r.body.url.includes('mp4')) {
                sf.get('http://random.dog/woof.json').then(r => {
                    msg.channel.send({files: [r.body.url]});
                });
                return;
            }
            msg.channel.send({files: [r.body.url]});
        });
    }
};

exports.help = {
    category: 'fun',
    usage: '',
    description: 'Shows a random dog',
    detail: `Shows you a random dog every time the command gets triggered`,
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: false,
    alias: [
        null
    ]
};
