const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
const ms = require('ms');
const moment = require('moment');
exports.run = async client => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.filter(i => !i.bot).size} users`);
    client.user.setPresence({game: {name: 'tests', type: 0}}).catch(err => logger.error(err));


    // let rows = await r.table('livestreams').run();
    // for (let row of rows) {
    //     if (row.streams) {
    //         let arr = [];
    //         for (let a of row.livestreams) {
    //             arr.push(a.name);
    //         }
    //         twitch.online(arr).then(data => {
    //             console.log(data);
    //             for (let key in data) {
    //                 if (data.hasOwnProperty(key)) {
    //                     console.log(key);
    //                     let p =  row.livestreams;
    //                     function findInd(element) {
    //                         return element.name === key;
    //                     }
    //
    //                     let toInsert = data[key].online ? {
    //                         game: data[key].game,
    //                         views: data[key].views,
    //                         image: data[key].image,
    //                         mature: data[key].mature,
    //                         lang: data[key].lang,
    //                         name: data[key].name,
    //                         url: data[key].url,
    //                         msgID: null,
    //                         online: true
    //                     } : {online: false, name: key};
    //
    //                     let appendToArray = (table, uArray, doc) => r.table(table)
    //                         .filter({guildID : msg.guild.id})
    //                         .update(object => ({ [uArray]: object(uArray)
    //                             .default([]).changeAt(p.findIndex(findInd), toInsert) }))
    //                         .run();
    //                     appendToArray('livestreams', 'livestreams')
    //                 }
    //             }
    //
    //
    //
    //         })}
    // }
    setInterval(async () => {
      let arr = await r.table('timers').filter({userID : "NONE"}).run();
      if (arr[0].inPunishQueue[0]) {
          for (var i = 0; i < arr[0].inPunishQueue.length; i++) {
            console.log('loopy');
            let guildID = arr[0].inPunishQueue[i]['guildID'];
            let userID = arr[0].inPunishQueue[i]['userID'];
            let usersUnix = await r.table('timers').filter({
              guildID : guildID,
              userID  : userID
            }).run()
            console.log(Date.now(), "CURRENT UNIX", usersUnix[0].mute, "MUTE UNIX", guildID , "GUILDID", userID, "USERID"); // false
            if (usersUnix[0].mute &&(usersUnix[0].mute < Date.now())) {
              logger.info('Removed new muted role [auto]')
              let muteRole = client.guilds.get(guildID).roles.find('name', 'may-muted');
              client.guilds.get(guildID).members.get(userID).removeRole(muteRole);
              let p = arr[0].inPunishQueue
              function findInd(element) {
                return element.userID === userID && element.guildID === guildID
              }
              p.findIndex(findInd)

              let appendToArray = (table, uArray) => r.table(table)
             .filter({userID : "NONE"})
             .update(object => ({ [uArray]: object(uArray)
             .default([]).deleteAt(p.findIndex(findInd)) }))
             .run();


             appendToArray('timers', 'inPunishQueue');
             await r.table('timers').filter({
               guildID : guildID,
               userID  : userID
             }).delete().run();
            }
          }
        }
      }, ms('10s'));
};
