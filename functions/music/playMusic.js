const ytdl            = require('ytdl-core');
const jsonDatabase    = require('node-json-db');
const db              = new jsonDatabase('./musicQueue/queue.json', true, true);

const fetcher = require('youtube-info');
async function playMusic(connection, msg) {
  db.reload();

  let nextSong = db.getData(`/guilds/${msg.guild.id}/queue`);
  let yInfo = await fetcher(nextSong[0]);
  msg.channel.send({embed : {description : `Started to stream ${yInfo.title}`, color : 0x8ecf7b}})
  dispatcher = connection.playStream(ytdl(nextSong[0], {filter: 'audioonly'}));
  setTimeout(async function () {
    await db.delete(`/guilds/${msg.guild.id}/queue[0]`);
  }, 1000);

  dispatcher.on('end', async () => {
    if (nextSong) {
      try {
        await playMusic(connection, msg);
      } catch (e) {
        db.delete(`/guilds/${msg.guild.id}/queue`);
        msg.channel.send({embed:{description: "Queue finished leaving voice channel", color: 0x1bd99a}})
        connection.disconnect();
      }

    } else {
      console.log(nextSong);
      connection.disconnect();
      msg.channel.send({embed:{description: "Queue finished leaving voice channel", color: 0x1bd99a}})
      db.delete(`/guilds/${msg.guild.id}/queue`);
    }
  });
}

module.exports = playMusic
