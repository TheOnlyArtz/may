// TODO: Remove command
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
const ms = require('ms')
const Discord = require('discord.js');
let check = async (client) => {
    setInterval(async () => {
      console.log('Started');
        let queue = await r.table('livestreams').getAll('NONE', {index : 'guildID'}).run();

        // If 0 guilds are using the twitch system return.
        if (!queue[0].inQueue) return;

        // Loop  through all the streams and check for status
        for (let i = 0; i < queue[0].inQueue.length; i++) {

            //GuildID to look for.
            const guildID = queue[0].inQueue[i].guildID;
            const channelID = queue[0].inQueue[i].channelID;

            const channels = await r.table('livestreams').get(queue[0].inQueue[i].guildID + queue[0].inQueue[i].channelID).run(); //all the channels
            console.log('1');
            if (!channels) return;

            //Loop through all the twitch streamers
            channels.livestreams.forEach(async O => {
              console.log('2');
                try {
                    const data = await twitch.check(O.name);

                    // Find the index
                    function findInd(element) {
                        return element.name === O.name
                    }

                    let toInsert1 = data.online === true ? {
                        game: data.game,
                        views: data.views,
                        image: data.image,
                        mature: data.mature,
                        lang: data.lang,
                        name: data.name,
                        url: data.url,
                        online: true
                    } : {online: false, name: data.name};

                    if (toInsert1['game']) {
                      await r.table('livestreams')
                          .get(`${guildID}${channelID}`)
                          .update({
                              livestreams: r.row('livestreams').map((f) => {
                                  return r.branch(
                                      f("name").eq(O.name),
                                      f.merge(toInsert1),
                                      f
                                  )
                              })
                          }).run();
                          console.log('3');
                    } else {
                      let appendToArray = (table, uArray, doc) => r.table(table)
                          .get(guildID + channelID)
                          .update(object => ({ [uArray]: object(uArray)
                          .default([]).changeAt(channels.livestreams.findIndex(findInd), doc) }))
                          .run();
                          appendToArray('livestreams', 'livestreams', toInsert1)
                      console.log('4');
                    }

                    if (O.online === true && !O.msgStatus) {
                      console.log('SENT');
                        const embed = new Discord.RichEmbed()
                            .setTitle(`${O.name} is live!`)
                            .addField('Game', O.game, true)
                            .addField('Language', O.lang, true)
                            .addField('Stream Link', `[${O.name}](${O.url})`)
                            .setImage(O.image)
                            .setColor('#56b91f')
                            .setThumbnail(O.image);
                        client.channels.get(channels.channelID).send({embed});

                        // appendToArray('livestreams', 'livestreams', toInsert2)
                        await r.table('livestreams')
                            .get(`${guildID}${channelID}`)
                            .update({
                                livestreams: r.row('livestreams').map((f) => {
                                    return r.branch(
                                        f("name").eq(O.name),
                                        f.merge({msgStatus: 'inserted'}),
                                        f
                                    )
                                })
                            }).run()
                    }

                } catch (e) {
                    logger.error(e)
                }

            });
        }

    }, ms('10s'));
};

module.exports = check;
