const ms = require('ms');
const moment = require('moment');
  function punishment(client) {
    setInterval(async () => {
      let arr = await r.table('timers').filter({userID : "NONE"}).run();
      if (arr[0].inPunishQueue[0]) {

          for (var i = 0; i < arr[0].inPunishQueue.length; i++) {

            let guildID = arr[0].inPunishQueue[i]['guildID'];
            let userID = arr[0].inPunishQueue[i]['userID'];
            let usersUnix = await r.table('timers').filter({
              guildID : guildID,
              userID  : userID
            }).run()

            if (usersUnix[0].mute &&(usersUnix[0].mute < Date.now())) {

              let muteRole = client.guilds.get(guildID).roles.find('name', 'may-muted');

              try {
                let userObject = await client.guilds.get(guildID).fetchMember(userID);
                await userObject.removeRole(muteRole);
                logger.info('Removed new muted role [auto]');
              } catch (e) {
                await r.table("timers")
                .filter({guildID : guildID, userID : userID})
                .update({mute : null}).run();
                logger.error('Could not remove the role [error]');
              }

              let appendToArray = (table, uArray) => r.table(table)
             .filter({userID : "NONE"})
             .update(object => ({ [uArray]: object(uArray)
             .default([]).deleteAt(i) }))
             .run();

             appendToArray('timers', 'inPunishQueue');
             if (usersUnix[0].ban) {
               await r.table("timers")
               .filter({guildID : guildID, userID : userID})
               .update({mute : null}).run();
             } else {

               //Else, delete the document
               await r.table('timers').filter({
                 guildID : guildID,
                 userID  : userID
               }).delete().run();

              }
            }
            if (usersUnix[0].ban && (usersUnix[0].ban < Date.now())) {
              try {
                let p = await client.guilds.get(guildID)
                await p.unban(userID).catch(logger.error)
                logger.info('Unbanned new user [auto]');
              } catch (e) {
                logger.error('Could not ban the user [error]');
              }

              let appendToArray = (table, uArray) => r.table(table)
             .filter({userID : "NONE"})
             .update(object => ({ [uArray]: object(uArray)
             .default([]).deleteAt(i) }))
             .run();
             appendToArray('timers', 'inPunishQueue');

             if (usersUnix[0].mute) {
               await r.table("timers")
               .filter({guildID : guildID, userID : userID})
               .update({ban : null}).run();
             } else {
               //Else, delete the document
               await r.table('timers').filter({
                 guildID : guildID,
                 userID  : userID
               }).delete().run();

              }
            }
          }
        }
      }, ms('10s'));
  }

module.exports = punishment;
