const ms   = require('ms');
const time = require('moment');

/**
* @param {String} time - the unformatted time of the punishment
* @param {String} table - what table to look into
* @param {String} user - the selected user ID
*/
async function timer(time, table, user) {
  /*
  * Get the inserted time of the user from the database.
  */
  let userObj = await r.table(table).filter({userID : user}).run()[0];

}

module.exports = timer;
