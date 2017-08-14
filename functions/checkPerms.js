function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  let botPermsMissing = [];
  for (let i = 0; i < cmd.help.botPerm.length; i++) {
    if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
      botPermsMissing.push(botPermissions[i])
    }
  }
  if (botPermsMissing[0]) {
    if(!msg.guild.member(client.user).hasPermission(botPermsMissing)) {
      msg.channel.send(`Cannot perform ${cmd.help.name} missing permissions => (${botPermsMissing.join(' ')})`).catch(logger.error)
      return true
  }
}
  for (let i = 0; i < cmd.help.authorPerm.length; i++) {
    if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
      return msg.channel.send(`Missing permissions for ${msg.author.username} => \`(${cmd.help.authorPerm[i]})\``)
        .catch(e => {
          logger.error(e)
        })
    }

  }
  return false;
}

module.exports = checkForPermissions;
