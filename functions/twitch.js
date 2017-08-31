
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
const Discord = require('discord.js');
let check = async (client) => {
    setInterval(async () => {
        let queue = await r.table('livestreams').getAll('NONE', {index : 'guildID'}).run()

        // If 0 guilds are using the twitch system return.
        if (!queue[0].inQueue) return;

        // Loop  through all the streams and check for status
        for (var i = 0; i < queue[0].inQueue.length; i++) {

          //GuildID to look for.
          const guildID = queue[0].inQueue[i].guildID;
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

             let toInsert1 = data.online ? {
             game: data.game,
             views: data.views,
             image: data.image,
             mature: data.mature,
             lang: data.lang,
             name: data.name,
             url: data.url,
             online: true
             } : {online: false, name: data.name};

            let appendToArray = (table, uArray, toinsert) => r.table(table)
            .getAll(guildID, {index: "guildID"})
            .update(object => ({ [uArray]: object(uArray)
            .default([]).update(channels[0].livestreams.findIndex(findInd), toinsert) }))
            .run();
            appendToArray('livestreams', 'livestreams', toInsert1)

            setTimeout(() => {
              if (O.online === true && !O.msgID) {
                const embed = new Discord.RichEmbed()
                .setTitle(`${O.name} is on live!`)
                .addField('Game', O.game, true)
                .addField('Language', O.lang)
                .addField('Stream Link', `[${O.name}](${O.url})`)
                .setImage(O.image)
                .setThumbnail(O.image);
                client.channels.get(channels[0].channelID).send({embed});

                appendToArray('livestreams', 'livestreams', toInsert2)
                // RIGHT HERE, I want to update so msgID will not be null but every new update that comes it gets updated to null

              }
            }, 6000)

            } catch (e) {
              logger.error(e)
            }

          });
        }

    }, 10000);
};

module.exports = check;
