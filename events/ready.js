exports.run = async client => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.filter(i => !i.bot).size} users`);
    client.user.setPresence({game: {name: 'tests', type: 0}}).catch(err => logger.error(err));


    let rows = await r.table('livestreams').run();
    for (let row of rows) {
        if (row.streams) {
            let arr = [];
            for (let a of row.livestreams) {
                arr.push(a.name);
            }
            twitch.online(arr).then(data => {
                console.log(data);
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        console.log(key);
                        let p =  row.livestreams;
                        function findInd(element) {
                            return element.name === key;
                        }

                        let toInsert = data[key].online ? {
                            game: data[key].game,
                            views: data[key].views,
                            image: data[key].image,
                            mature: data[key].mature,
                            lang: data[key].lang,
                            name: data[key].name,
                            url: data[key].url,
                            msgID: ,
                            online: true
                        } : {online: false, name: key};

                        let appendToArray = (table, uArray, doc) => r.table(table)
                            .filter({guildID : msg.guild.id})
                            .update(object => ({ [uArray]: object(uArray)
                                .default([]).changeAt(p.findIndex(findInd), toInsert) }))
                            .run();
                        appendToArray('livestreams', 'livestreams')
                    }
                }



            })}
    }


};
