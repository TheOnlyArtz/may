function checkForPermissions(botPermissions, authorPermissions, cmd) {
  if (!botPermissions && !authorPermissions) throw Error(`You must specify the permissions for ${cmd}`)
}

module.exports = checkForPermissions;
