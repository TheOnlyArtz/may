const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);

exports.run = async client => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.filter(i => !i.bot).size} users`);
    client.user.setPresence({game: {name: 'tests', type: 0}}).catch(err => logger.error(err));


    let rows = await r.table('livestreams').run();
    /*
    rows returns an array
    */
    for (let row of rows) {
        if (row.streams) {
            for (let a of row.livestreams) {

                twitch.check(a.name).then(data => {
                    console.log(data);
                    let p =  row.livestreams;
                    function findInd(element) {
                        return element.name === data.name;
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
                        .filter({guildID : msg.guild.id})
                        .update(object => ({ [uArray]: object(uArray)
                            .default([]).changeAt(p.findIndex(findInd), toInsert) }))
                        .run();
                    appendToArray('livestreams', 'livestreams')
                })
            }
        }
    }


};
