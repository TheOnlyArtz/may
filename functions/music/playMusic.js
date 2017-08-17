const ytdl = require('ytdl-core');
const jsonDatabase = require('node-json-db')
const db = new jsonDatabase('./musicQueue/queue.json', true, true);
async function playMusic(connection, msg) {
  let nextSong = db.getData(`parent/${msg.guild.id}/queue[0]`);
  dispatcher = connection.playStream(ytdl(nextSong, {filter: 'audioonly'}));

  setTimeout(() =>  {
    db.delete(`parent/${msg.guild.id}/queue[0]`);
  }, 1000);

  db.reload();
  dispatcher.on('end', async () => {
    if (nextSong) {
      try {
        await play(playMusic, msg);
      } catch (e) {
        db.delete(`/parent/${message.guild.id}`)
        connection.disconnect();
      }

    } else {
      connection.disconnect();
      db.delete(`/parent/${message.guild.id}`);
    }
  });
}

module.exports = playMusic
