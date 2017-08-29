const ms   = require('ms');
const time = require('moment');

/**
* @param {String} time - the unformatted time of the punishment
* @param {String} table - what table to look into
* @param {String} user - the selected user ID
* @param {String} guild - insert the guildID
* @param {String} punishment - the punishment for the user
*/
async function timer(time, table, user, punishment, guild) {

  /**
  * @param {String} table - what table to look into
  * @param {String} user - filter with the userID
  * @param {String} guild - filter with the guildID
  */
  let exists = await r.table(table).filter({
    guildID : guild,
    userID : user
  }).run();
  if (exists[0] === undefined) {
    /**
    * @param {String} table - what table to look into
    * @param {String} user - insert the userID
    * @param {String} guild - insert the guildID
    */
    await r.table(table).insert({
      guildID : guild,
      userID : user,
      ban    : null,
      mute   : null
    }).run();
  }

  let appendToArray = async (table, uArray, doc) => await r.table(table)
  .filter({userID : 'NONE'})
  .update(object => ({ [uArray]: object(uArray)
  .default([]).append(doc) }))
  .run();
  appendToArray('timers', 'inPunishQueue', {userID : user, guildID : guild})

  /*
  * Get the data when the punish should end
  */
  let unformattedUnix = moment().add(ms(ms(time)), 'ms')
  /*
  * Insert the time of the punishment to the database.
  */
  if (exists) {
    await r.table(table).filter({guildID : guild, userID : user}).update({
      [punishment] : (new Date(unformattedUnix)).getTime() //Inserts UNIX formatted timestamp
    }).run();
  }
}

module.exports = timer;
