
const https = require('https');
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
        return new Promise(async (resolve, reject) => {
            let body = await sf.get('https://api.twitch.tv/kraken/streams/' + stream).set({"Client-ID" : this.clientID, Accept: 'application/vnd.twitchtv.v3+json'});
            let json = body.body;

            if (json.stream === null) {
                return resolve({online: false, name: stream});
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
            let full = {
                game: game,
                views: views,
                image: image,
                mature: mature,
                lang: lang,
                name: name,
                url: url,
                online: true
            };
            return resolve(full);

        });
    }

    async register(stream) {
        return await sf.get('https://api.twitch.tv/kraken/channels/' + stream).set({"Client-ID" : this.clientID, Accept: 'application/vnd.twitchtv.v3+json'});
    }
}

module.exports = Twitch;
