const ytdl = require('ytdl-core');
const jsonDatabase = require('node-json-db')
const db = new jsonDatabase('./musicQueue/queue.json', true, true);
async function playMusic(connection, msg) {
  let nextSong = db.getData(`parent/${msg.guild.id}/queue`);
  dispatcher = connection.playStream(ytdl(nextSong[0], {filter: 'audioonly'}));

  setTimeout(async function () {
    await db.delete(`parent/${msg.guild.id}/queue[0]`);
  }, 500);

  dispatcher.on('end', async () => {
    if (nextSong[0] || nextSong.length > 0) {
      try {
        await play(playMusic, msg);
      } catch (e) {
        db.delete(`/parent/${msg.guild.id}`)
        connection.disconnect();
      }

    } else {
      connection.disconnect();
      db.delete(`/parent/${msg.guild.id}`);
    }
  });
}

module.exports = playMusic
