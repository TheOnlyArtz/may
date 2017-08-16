exports.run = async (client,msg,args) => {

};

exports.help = {
    category: 'moderation',
    usage: '[mention:user] [reason:string]',
    description: 'Warn someone',
    detail: 'Use warn to warn someone who passes the rules.',
    botPerm    : ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm : [],
    alias      : [
        'wa'
    ]
};
