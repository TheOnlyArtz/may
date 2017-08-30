
const twitchClass = require('../classes/twitch.js');
const twitch = new twitchClass(config.CLIENTID);

let check = async (bot) => {

    let rows = await r.table('livestreams').run();
    /*
    rows returns an array
    */
    for (let row of rows) {
        /*
        get one server
         */
        if (row.streams) {
            for (let a of row.livestreams) {
                /*
                get every stream from one server
                 */
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

module.exports = check;
