const sf = require('snekfetch');
const cooldown = require('../functions/cooldown.js');
exports.run = async(client, msg, args) => {
    if (cooldown(msg, 'anime', 60, 'This command has a cooldown of **1 Minute**!')) {
        let res = await sf.get('http://api.cutegirls.moe/json');
        if (res.body.status !== 200) return msg.channel.send('An error occurred while processing this command.');
        msg.channel.send({files: [res.body.data.image]});
    }
};
exports.help = {
    category   : 'fun',
    usage      : false,
    description: 'Random anime pic',
    detail     : 'Displaying a random anime picture',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    example    : false,
    alias      : [
        null
    ]
};
