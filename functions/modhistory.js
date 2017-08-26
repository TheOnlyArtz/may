/** @ignore */
const chalk = require('chalk');
// A function for modhistory table
let table = r.table('ModHistory');

/**
* @param {String} column - What column to update
* @param {String} guild - guild would be the ID of the guild
* @param {String} user - user would be the ID of the user
*/
async function updateModHistory(column, guild, user) {
  try {
    /**
    * @param {String} guild - guild would be the ID of the guild
    * @param {String} user - user would be the ID of the user
    * @var {Array} exists - Checks if the user is already inside the database
    */
    let exists = await table.filter({
        guildID : guild,
        userID  : user,
      })
      .run();

    /**
    * Update the column for the specific Punishment
    * @param {String} column -the specific punishment
    * @returns {Promise}
    * @returns {Error}
    */
    if (exists[0]) {
      table.filter({guildID : guild, userID : user})
        .update({
          [column] : exists[0][column] ? parseInt(exists[0][column]) + 1 : 1
        })
          .run()
          .then(() => logger.info('updated new user into the database reason : ' + chalk.red('[Punishment]')))
    } else {
      table.insert({
        guildID : guild,
        userID  : user,
        [column] : 1
      }).run()
        .then(() => logger.info('updated new user into the database reason : ' + chalk.red('[Punishment]')))
    }

  } catch (e) {
    logger.error(e)
  }
}

module.exports = updateModHistory;
