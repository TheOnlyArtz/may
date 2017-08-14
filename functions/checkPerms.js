function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  let botPermsMissing = [];
  let authorPermsMissing = [];

  for (let i = 0; i < cmd.help.botPerm.length; i++) {
    if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
      botPermsMissing.push(botPermissions[i])
    }
  }
  if (botPermsMissing[0]) {
    if(!msg.guild.member(client.user).hasPermission(botPermsMissing)) {
      embedMessage.descEmbed({
        type    : "desc",
        content : `🔒I'm missing permissions\n**List**: ${botPermsMissing.join(', ')}`,
        color   : 0xe23903
      })

      // msg.channel.send(`Cannot perform ${cmd.name} missing permissions => (${botPermsMissing.join(' ')})`).catch(logger.error)
      return true
  }
}
  for (let i = 0; i < cmd.help.authorPerm.length; i++) {
    if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
      authorPermsMissing.push(botPermissions[i])
    }
  }
  if (authorPermsMissing[0]) {
    if(!msg.guild.member(msg.author).hasPermission(authorPermsMissing)) {
      embedMessage.descEmbed({
        type    : "desc",
        content : `🔒${msg.author} is missing permissions\n**List**: ${authorPermsMissing.join(', ')}`
      })
      return true
  }
}
  return false;
}

module.exports = checkForPermissions;
