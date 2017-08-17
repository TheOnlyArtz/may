/**
*@function {fetchSongData} fetching data from the video to play it
*/
const fetchSongData = require('../functions/music/fetchSongData.js');
exports.run = async (client,msg,args) => {
  let searchTerms = args.join(' ');
  let videoId = await fetchSongData(client, msg, searchTerms);

  if (videoId) {
      if (!this.message.guild.voiceConnection) {
        this.message.member.voiceChannel.join()
          .then(async connection => {
            logger.info(`Started to stream ${chalk.magenta(r.body.items[0].title)} for ${this.message.author.username}`);
            play(connection, this.message);
        });
    }

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
