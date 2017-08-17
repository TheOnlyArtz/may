/**
*@function {fetchSongData} fetching data from the video to play it
*/
const fetchSongData = require('../functions/music/fetchSongData.js');
exports.run = async (client,msg,args) => {
  let searchTerms = args.join(' ');
  fetchSongData(client, msg, searchTerms);
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
