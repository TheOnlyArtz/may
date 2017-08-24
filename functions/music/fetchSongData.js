/** @ignore */
const apiKey = require('../../config/config.json').YOUTUBEAPIKEY;
const ytPI = require('simple-youtube-api');

const videoFetcher = new ytPI(apiKey);
const sf = require('snekfetch');
const p = require('simple-youtube-api');

const playListFetcher = new p(apiKey);

async function fetchSongData(client, msg, toSearch) {
  /**
  * @param {String} toSearch Getting the right video to play
  * @param {String} apiKey getting access to the data
  * @returns {Promise}
  * @returns {Error}
  */

    let data = await sf.get(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=` + encodeURIComponent(toSearch) + '&key=' + apiKey);
    try {
        return (data.body.items[0].id.videoId);
    } catch (e) {
        msg.reply('We could not find the requested song');
    }
}
module.exports = fetchSongData;
