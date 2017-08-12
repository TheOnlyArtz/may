const sf = require('snekfetch')
const coolClass = require('../classes/cooldown.js');
exports.run = (client, msg, args) => {
  const cooldown  = new coolClass({time : 300000})
  cooldown.cooldownIt(msg)
  console.log(cooldown.cooldowns);
  sf.get('http://random.cat/meow').then(r => msg.channel.send(r.body))
};

exports.help = {
    category   : 'fun',
    usage      : '',
    description: 'Shows a random cat',
    detail     : `Shows you a random cat every time the command gets triggered`,
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : ['SEND_MESSAGES', "EMBED_LINKS"],
    alias      : [
        null
    ]
};
