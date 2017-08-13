const coolClass = require('../classes/cooldown.js');
const sf = require('snekfetch');
exports.run = (client, msg, args) => {
  const cooldown  = new coolClass({time : "5 minutes"});
  if (cooldown.cooldownIt(msg)) {
      sf.get('http://random.cat/meow').then(r => {
        msg.channel.send(r.body)
      })
  }
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
