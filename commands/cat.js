const sf = require('snekfetch')
const calldown = [];
exports.run = (client, msg, args) => {
  if (calldown.includes(msg.author.id)) {
    return msg.reply('The cooldown is still active total (5 Minutes)')
  }
  setTimeout(() => {
    calldown.pop(msg.author.id)
  }, (60 * 5) * 1000)
  if (calldown.includes(msg.author.id)) {
    return msg.reply('The cooldown is still active total (5 Minutes)')
  }
  sf.get('http://random.cat/meow').then(r => msg.channel.send(r.body))
  calldown.push(msg.author.id)
};

exports.help = {
    usage      : '',
    description: 'Shows a random cat',
    detail     : `Shows you a random cat every time the command gets triggered`,
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : ['SEND_MESSAGES', "EMBED_LINKS"],
    alias      : [
        null
    ]
};
