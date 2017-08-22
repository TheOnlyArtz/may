const instructions = require('./permInstructions.js');
const Discord = require('discord.js')
function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  const embedClass  = require('../classes/embedMessage.js');
  let embedMessage = new embedClass(msg);
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  let botPermsMissing = [];
  let authorPermsMissing = [];
  let botInstructions = [];
  for (let i = 0; i < cmd.help.botPerm.length; i++) {
    if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
      botInstructions.push(`[instructions](${instructions(botPermissions[i])})`)
      botPermsMissing.push(botPermissions[i]);
    }
  }
  if (botPermsMissing[0]) {
    if(!msg.guild.member(client.user).hasPermission(botPermsMissing)) {
      msg.channel.send(`= ❌Missing permissions❌ =\nMissing List: ${botPermsMissing.join(', ')}\nPlease Turn On: `,{code : "asciidoc"})
        .catch(logger.error)
      // msg.channel.send(`Cannot perform ${cmd.name} missing permissions => (${botPermsMissing.join(' ')})`).catch(logger.error)
      return true
  }
}
  for (let i = 0; i < cmd.help.authorPerm.length; i++) {
    if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
      authorPermsMissing.push(authorPermissions[i])
    }
  }
  if (authorPermsMissing[0]) {
    if(!msg.guild.member(msg.author).hasPermission(authorPermsMissing)) {
      msg.channel.send(`= ❌${msg.author.username} is Missing permissions❌ =\nMissing List: ${authorPermsMissing.join(', ')}`,{code : "asciidoc"})
      return true
  }
}
  return false;
}

module.exports = checkForPermissions;
