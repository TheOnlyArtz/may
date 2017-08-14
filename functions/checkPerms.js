function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  for (let i = 0; i < cmd.help.botPerm.length; i++) {
    if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
        msg.channel.send(`I cannot make it through the command Reason: Missing permissions (` + cmd.help.botPerm[i] + ' ' + ")")
        .catch(e => logger.error(e, 'Missing permissions to speak at', msg.guild.name));
    }
    if (i === cmd.help.botPerm.length);
  }
  console.log(botPermissions);
  if(msg.guild.member(client.user).hasPermission(botPermissions)) return
  for (let i = 0; i < cmd.help.authorPerm.length; i++) {
    if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
      return msg.channel.send(`Missing permissions for ${msg.author.username} => \`(${cmd.help.authorPerm[i]})\``)
        .catch(e => {
          logger.error(e)
        })
    }

  }
  return true;
}

module.exports = checkForPermissions;
