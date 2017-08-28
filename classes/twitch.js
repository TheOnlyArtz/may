
const sf = require('snekfetch');
const config = require('../config/config.json');

class Twitch {
    /**
     * @param clientID {string}
     */
    constructor(clientID) {
        this.clientID = clientID;
        if (typeof this.clientID !== 'string') {
            throw new TypeError('Client ID must be a string.');
        }
    }

    /**
     * @param stream {string} Streamer name
     */
    check(stream) {
        return new Promise((resolve, reject) => {
            let apiPath = '/kraken/streams/' + stream;
            let opt = {
                host: 'api.twitch.tv',
                path: apiPath,
                headers: {
                    'Client-ID': this.clientID,
                    Accept: 'application/vnd.twitchtv.v3+json'
                }
            };
            https.get(opt, res => {
                let body = '';

                res.on('data', chunk => {
                    body += chunk;
                });

                res.on('end', () => {
                    let json;
                    try {
                        json = JSON.parse(body);
                    } catch (err) {
                        return reject(logger.error(err));
                    }
                    if (json.stream === null) {
                        return resolve([stream]);
                    }
                    /**
                     * @param {String} game The game the streamer is playing
                     */
                    let game = json.stream.game;
                    /**
                     * @param {String} viewers Number of viewers the streamer has
                     */
                    let views = json.stream.viewers;
                    /**
                     * @param {Object} preview Object contains twitch preview pictures
                     * @param {String} large Link of large image
                     */
                    let image = json.stream.preview.large;
                    /**
                     * @param {Boolean} mature Marks if a stream is for a mature viewer base
                     */
                    let mature = json.stream.channel.mature;
                    /**
                     * @param {String} lang Language of the stream
                     */
                    let lang = json.stream.channel.broadcaster_language;
                    /**
                     * @param {String} name The displayed name of the Twitch Streamer
                     */
                    let name = json.stream.channel.display_name;
                    /**
                     * @param {String} URI Link to stream
                     */
                    let url = json.stream.channel.url;
                    return resolve([game, views, image, mature, lang, name, url]);
                });
            }).on('error', err => {
                return reject(logger.error(err));
            });
        });
    }

    online(streams) {
        let toPromise = [];
        let full = {};
        for (let i = 0; i < streams.length; i++) {
            toPromise.push(new Promise((resolve, reject) => {
                this.check(streams[i]).then(checkArr => {
                    if (checkArr[1]) {
                        full[checkArr[5]] = {
                            game: checkArr[0],
                            views: checkArr[1],
                            image: checkArr[2],
                            mature: checkArr[3],
                            lang: checkArr[4],
                            name: checkArr[5],
                            url: checkArr[6],
                            online: true
                        };
                    } else {
                        full[checkArr[0]] = {online: false};
                    }

                    resolve();
                });
            }));
        }
        return Promise.all(toPromise).then(() => {
            return new Promise((resolve, reject) => {
                resolve(full);
            });
        });
    }

    async register(stream) {
        return await sf.get('https://api.twitch.tv/kraken/channels/' + stream).set({"Client-ID" : this.clientID, Accept: 'application/vnd.twitchtv.v3+json'});

    }
}

module.exports = Twitch;
