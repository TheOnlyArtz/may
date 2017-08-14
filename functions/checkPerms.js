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
