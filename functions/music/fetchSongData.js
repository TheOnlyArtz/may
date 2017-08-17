/** @ignore */
const apiKey = require('.../config/config.json')
const ytPI         = require('simple-youtube-api');
const videoFetcher = new ytPI(apiKey)
function fetchSongData(client, msg, toSearch) {

}

module.exports = fetchSongData;
