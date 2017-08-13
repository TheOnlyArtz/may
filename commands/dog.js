const coolClass = require('../classes/cooldown.js');
const sf = require('snekfetch');
exports.run = (client, msg, args) => {
    const cooldown  = new coolClass({time : "5 minutes"});
    if (cooldown.cooldownIt(msg)) {
        sf.get('http://random.dog/woof.json').then(r => {
            if (r.body.url.includes('mp4')) {
                sf.get('http://random.dog/woof.json').then(r => {
                    msg.channel.send({files: [r.body.url]});
                });
                return;
            }
            msg.channel.send({files: [r.body.url]});
        })
    }
};

exports.help = {
    category   : 'fun',
    usage      : '',
    description: 'Shows a random dog',
    detail     : `Shows you a random dog every time the command gets triggered`,
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : ['SEND_MESSAGES', "EMBED_LINKS"],
    alias      : [
        null
    ]
};
