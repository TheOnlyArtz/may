/**
*@function {fetchSongData} fetching data from the video to play it
*@function {checkGuildVC} Check if the bot connects to a voice channel in the guild
*/

const fetchSongData = require('../functions/music/fetchSongData.js');
const checkGuildVC = require('../functions/music/checkGuildVC.js');
const pushSongs = require('../functions/music/pushSongs.js');

exports.run = async (client,msg,args) => {
  let searchTerms = args.join(' ');
  let videoId = await fetchSongData(client, msg, searchTerms);
  if (!msg.member.voiceChannel) {
    return msg.reply('You must be in a voiceChannel')
  }
  if (videoId) {
    await pushSongs(msg, videoId);
    await checkGuildVC(client, msg);
  } else {
    return;
  }
};

exports.help = {
    category: 'music',
    usage: '[Link or Term]',
    description: 'Play music',
    detail: 'Play music while you are in a voicechannel',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS', 'CONNECT', 'SPEAK', 'USE_VAD'],
    authorPerm : [],
    alias      : [
        'm p'
    ]
};
