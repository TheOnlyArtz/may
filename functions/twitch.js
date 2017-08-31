// TODO: Remove command
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);
const Discord = require('discord.js');
let check = async (client) => {
    setInterval(async () => {
        let queue = await r.table('livestreams').getAll('NONE', {index : 'guildID'}).run();

        // If 0 guilds are using the twitch system return.
        if (!queue[0].inQueue) return;

        // Loop  through all the streams and check for status
        for (let i = 0; i < queue[0].inQueue.length; i++) {

            //GuildID to look for.
            const guildID = queue[0].inQueue[i].guildID;
            const channelID = queue[0].inQueue[i].channelID;

            const channels = await r.table('livestreams').get(queue[0].inQueue[i].guildID + queue[0].inQueue[i].channelID).run(); //all the channels

            if (!channels) return;

            //Loop through all the twitch streamers
            channels.livestreams.forEach(async O => {

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
                    if (O.online === true && !O.msgID) {
                        const embed = new Discord.RichEmbed()
                            .setTitle(`${O.name} is live!`)
                            .addField('Game', O.game, true)
                            .addField('Language', O.lang, true)
                            .addField('Viewers', O.views, true)
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
                                        f.merge({msgID: 'inserted'}),
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

<<<<<<< HEAD
    }, 7 * 60000);
=======
    }, 60000);
>>>>>>> 67ca88f7786b337f0c5bd4081accfec6a1041639
};

module.exports = check;
