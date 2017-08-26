// A function for modhistory table
let table = r.table('ModHistory');
/**
* @param {String} column - What column to update
* @param {String} guild - guild would be the ID of the guild
* @param {String} user - user would be the ID of the user
*/
async function updateModHistory(column, guild, user) {
  try {
      let exists = await table.filter({userID : user}).run()[0];
  } catch (e) {

  }
}
