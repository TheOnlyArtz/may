const ytdl = require('ytdl-core');
const jsonDatabase = require('node-json-db')
const db = new jsonDatabase('../../musicQueue/queue.json', true, true);
async function playMusic(msg, client, songID) {

}

module.exports = playMusic
