let db = require('node-json-db');

const queue = new db('./musicQueue/queue.json', true, true);
let shuffler = [];
let shuffReq = 0;
exports.run = async (client, msg) => {
    queue.reload();
    if (!shuffler.includes(msg.author.id)) {
        shuffler.push(msg.author.id);
        if (!msg.member.voiceChannel) {
            return msg.reply('You can\' skip since you aren\'t In a voice channel!');
        }
        shuffReq++;
        if (shuffReq >= Math.ceil((msg.member.voiceChannel.members.size - 1) / 2)) {
            try {
                let p = queue.getData(`/guilds/${msg.guild.id}/queue[0]`);
            } catch (e) {
                return msg.reply('No songs are currently in the play list');
            }

            try {
                dispatcher.end();
                shuffReq = 0;
                shuffler = [];
                msg.reply('Skipped on the song successfully!');
                logger.info(`${msg.author.username} Skipped successfully on the song`);
            } catch (e) {
                logger.error(e);
                msg.channel.send('**No songs are currently playing!**');
            }
        } else {
            msg.reply(`Hey ${msg.author.username}, Your skip as been added to the list\n\
  you need ` + Math.ceil(((msg.member.voiceChannel.members.size - 1) / 2) - shuffReq) + ' Guy(s) to skip the song');
        }
    }
};

exports.help = {
    category: 'music',
    usage: false,
    description: 'Skip music',
    detail: 'Skip the next song in the current playing queue',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'USE_VAD'],
    authorPerm: [],
    example: false,
    alias: [
        'm s'
    ]
};
