function reminder(client) {
    setInterval(() => {
      /**
      * @param {String} reminders - the table
      * @param {String} NONE - the Index value
      * @param {String} guildID - Table's index
      */
      let arr = await r.table('reminders').getAll("NONE", {index : "guildID"}).run();

      //Check if the array is empty
      if (arr[0].inQueue[0]) {
          for (var i = 0; i < arr[0].inQueue.length; i++) {
            /**
            * @var {Array|Object|String} - Get the guildID from the object
            * @var {Array|Object|String} - Get the userID from the object
            */
            const guildID = arr[0].inQueue[i]['guildID'];
            const userID = arr[0].inQueue[i]['userID'];
            const usersUnix = await table.getAll(guildID, userID, {index: "guildID", index: "userID"}).run();

            // Check  for the time and where to trigger the reminder
            if (usersUnix[0].time &&(usersUnix[0].time < Date.now())) {
              try {
                  let guild = client.users.guilds.get(guildID);
                  let memeber = await guild.fetchMember(userID);
                  client.channels.get(usersUnix[0].channelID).send(member)
              } catch (e) {
                  logger.error('Failed to trigger a reminder', e)
              }
          }
      }

    }, 5 * 1000);
}

module.exports = reminder;
