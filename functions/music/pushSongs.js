const jsonDatabase = require('node-json-db');

const db = new jsonDatabase('./musicQueue/queue.json', true, true);
async function pushSongs(msg, songID) {
    db.reload();
    try {
        await db.getData(`/guilds/${msg.guild.id}/queue`);
    } catch (e) {
        await db.push(`/guilds/${msg.guild.id}`, {queue: []}, false);
    }

    try {
        db.push(`/guilds/${msg.guild.id}`, {queue: [songID]}, false); // Push the 1st Item it found
    } catch (e) {
        console.error(e);
    }
}

module.exports = pushSongs;
