// TODO: Database Integration

const https = require('https');
const config = require('../config/config.json');
class twitch {
    /**
     *
     * @param clientID {string}
     */
    constructor(clientID) {
        this.clientID = clientID;
        if (typeof this.clientID !== 'string') throw Error('Client ID must be a string.');
    }

    /**
     *
     * @param stream {string} Streamer name
     */
    check (stream) {
        return new Promise( (resolve, reject) => {
            let apiPath = "/kraken/streams/" + stream;
            let opt = {
                host: "api.twitch.tv",
                path: apiPath,
                headers: {
                    "Client-ID": this.clientID,
                    Accept: "application/vnd.twitchtv.v3+json"
                }
            };
            https.get(opt, (res)=>{
                let body = "";

                res.on("data", (chunk)=>{
                    body += chunk;
                });

                res.on("end", ()=>{
                    let json;
                    try {
                        json = JSON.parse(body);
                    }
                    catch(err){
                        return reject(logger.error(err))
                    }
                    if (json.stream === null) {
                        return reject(stream)
                    }
                    else {
                        let game = json.stream.game;
                        let views = json.stream.viewers;
                        let image = json.stream.preview.large;
                        let mature = json.stream.channel.mature;
                        let lang = json.stream.channel.broadcaster_language;
                        let name = json.stream.channel.display_name;
                        let url = json.stream.channel.url;
                        return resolve([game,views,image,mature,lang,name,url]);
                    }
                });

            }).on("error", (err)=>{
                return reject(logger.error(err));
            });
        });

    }

    async online (streams) {
        let full = {};
        for (let i = 0; i < streams.length; i++) {
            try {
                let checkArr = await this.check(streams[i]);
                full[checkArr[5]] = {
                        game: checkArr[0],
                        views: checkArr[1],
                        image: checkArr[2],
                        mature: checkArr[3],
                        lang: checkArr[4],
                        name: checkArr[5],
                        url: checkArr[6],
                        online: true
                    }
            } catch (val) {
                full[val] = {online: false};
            }
        }
        return JSON.stringify(full);
    }

    register (stream) {
        let apiPath = "/kraken/channels/" + stream;
        let opt = {
            host: "api.twitch.tv",
            path: apiPath,
            headers: {
                "Client-ID": this.clientID,
                Accept: "application/vnd.twitchtv.v3+json"
            }
        };
        https.get(opt, (res)=>{
            let body = "";

            res.on("data", (chunk)=>{
                body += chunk;
            });

            res.on("end", ()=>{
                let json;
                try {
                    json = JSON.parse(body);
                }
                catch(err){
                    logger.error(err);
                    return false;
                }
                return json.status !== 404;

            });

        }).on("error", (err)=>{
            logger.error(err);
        });
    }
}

module.exports = twitch;