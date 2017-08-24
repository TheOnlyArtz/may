/**
*@function {fetchSongData} fetching data from the video to play it
 *@function {checkGuildVC} Check if the bot connects to a voice channel in the guild
 */

const fetchSongData = require('../functions/music/fetchSongData.js');
const checkGuildVC = require('../functions/music/checkGuildVC.js');
const pushSongs = require('../functions/music/pushSongs.js');
const InfoFetcher = require('youtube-info');
const moment = require('moment');
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    msg.delete();
    let searchTerms = args.join(' ');
    let videoId = await fetchSongData(client, msg, searchTerms);
    if (!msg.member.voiceChannel) {
        return msg.reply('You must be in a voiceChannel');
    }
    if (videoId) {
        await pushSongs(msg, videoId);
        await checkGuildVC(client, msg);
        let yInfo = await InfoFetcher(videoId);
        const embed = new Discord.RichEmbed()
            .setColor(0x00ABE0)
            .setAuthor('Added new song to the queue', client.user.displayAvatarURL)
            .setThumbnail(yInfo.thumbnailUrl)
            .addField('Song Info', `**Uploaded By:** ${yInfo.owner}\n**Duration:** ${(yInfo.duration / 60).toFixed(2)} Minutes\n**Views:** ${yInfo.views}`);
        msg.channel.send({embed});
    } else {

    }
};

exports.help = {
    category: 'music',
    usage: '[Link or Term]',
    description: 'Play music',
    detail: 'Play music while you are in a voicechannel',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'USE_VAD'],
    authorPerm: [],
    example: 'song name / link',
    alias: [
        'm p'
    ]
};
