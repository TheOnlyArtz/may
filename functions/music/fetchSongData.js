/** @ignore */
const apiKey = require('../../config/config.json').YOUTUBEAPIKEY
const ytPI         = require('simple-youtube-api');
const videoFetcher = new ytPI(apiKey)
const sf = require('snekfetch');

function fetchSongData(client, msg, toSearch) {

  /**
  * @param {String} toSearch Getting the right video to play
  * @param {String} apiKey getting access to the data
  * @returns {Promise}
  * @returns {Error}
  */
  sf.get(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=` + encodeURIComponent(toSearch) + '&key=' + apiKey)
    .then(async response => {
      logger.log(Object.keys(response.body.items));
  }).catch(e => {
    logger.error(e)
  })
}

module.exports = fetchSongData;
