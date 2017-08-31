
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);

let check = async (client) => {
    setInterval(async () => {

        let queue = await r.table('livestreams').getAll('NONE', {index : 'guildID'}).run()

        // If 0 guilds are using the twitch system return.
        if (!queue[0]) return;

        // Loop  through all the streams and check for status
        for (var i = 0; i < queue.length; i++) {

          //GuildID to look for.
          const guildID = queue[i].guildID;
          const channels = await r.table('livestreams').getAll(guildID, {index : 'guildID'}).run() //all the channels

          if (!channels[0]) return;

          //Loop through all the twitch streamers
          channels[0].livestreams.forEach(async O => {

            try {
              const data = await twitch.check(O.name);

              // Find the index
              function findInd(element) {
                return element.name === O.name
              }

             let toInsert = data.online ? {
             game: data.game,
             views: data.views,
             image: data.image,
             mature: data.mature,
             lang: data.lang,
             name: data.name,
             url: data.url,
             msgID: null,
             online: true
             } : {online: false, name: data.name};

            let appendToArray = (table, uArray, doc) => r.table(table)
            .getAll(guildID, {index: "guildID"})
            .update(object => ({ [uArray]: object(uArray)
            .default([]).changeAt(p.findIndex(findInd), toInsert) }))
            .run();
            appendToArray('livestreams', 'livestreams')


            if (O.online === true && msgID === null) {
              const embed = new Discord.RichEmbed()
              .setTitle(`${O.name} is on live!`)
              .addField('Game', O.game, true)
              .addField('Language', O.lang)
              .addField('Stream Link', `(${O.name})[${O.url}]`)
              .setThumbnail(O.image);
              client.channels.get(channels[0].channelID).send({embed});


            }

            } catch (e) {
              logger.error(e)
            }

          });
        }

    }, 7 * 60000);
};

module.exports = check;
