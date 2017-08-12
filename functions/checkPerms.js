function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  for (var i = 0; i < cmd.help.botPerm.length; i++) {
    if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
      console.log(cmd.help.botPerm[i]);
      if (i === 2) return;
        msg.channel.send(`I cannot make it through the command Reason: Missing permissions (` + cmd.help.botPerm[i] + ")")
        .catch(e => {
          logger.error(e)
          msg.guild.owner.send(`I cannot make it through the command Reason: Missing permissions (` + cmd.help.botPerm[i] + ")")
        });
    }
  }
  for (var i = 0; i < cmd.help.authorPerm.length; i++) {
    if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
      return msg.channel.send(`I cannot make it through the command Reason: Missing permissions (${cmd.help.authorPerm[i]})`)
        .catch(e => {
          logger.error(e)
        })
    }

  }
}

module.exports = checkForPermissions;
