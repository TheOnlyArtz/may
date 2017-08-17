exports.run = async (client,msg,args) => {

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
