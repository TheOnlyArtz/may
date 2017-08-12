function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
  if (!botPermissions && !authorPermissions) {
    throw Error `You must specify the permissions for ${cmd}`
  }

  else if (!cmd) {
    throw Error(`You must specify command name`);
  }

  if (!msg.guild.member(client.user).hasPermission(cmd.help.botPerm[0])) {
    return msg.channel.send(`I cannot make it through the command Reason: Missing permissions (${cmd.help.botPerm})`)
      .catch(e => {
        logger.error(e)
        msg.guild.owner.send(`I cannot make it through the command Reason: Missing permissions (${cmd.help.botPerm})`)
      });
  }

  if (!msg.guild.member(msg.author).hasPermission(cmd.help.authorPerm[0])) {
    return msg.channel.send(`I cannot make it through the command Reason: Missing permissions (${cmd.help.authorPerm})`)
      .catch(e => {
        logger.error(e)
      })
  }

}

module.exports = checkForPermissions;
