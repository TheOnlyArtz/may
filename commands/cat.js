const cooldown = new Set();
const sf = require('snekfetch');
exports.run = (client, msg, args) => {
    let toAdd = msg.author.id + msg.guild.id;
    if (cooldown.has(toAdd)) {
        return msg.reply('**[COOLDOWN]** Info command has **5 Minutes** Cooldown!');
    }
    cooldown.add(toAdd);

    setTimeout(() => {
        cooldown.delete(toAdd);
    }, 300000);
      sf.get('http://random.cat/meow').then(r => {
        msg.channel.send(r.body);
      })
};

exports.help = {
    category   : 'fun',
    usage      : '',
    description: 'Shows a random cat',
    detail     : `Shows you a random cat every time the command gets triggered`,
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : [null],
    alias      : [
        null
    ]
};
