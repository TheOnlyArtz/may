exports.run = async(client, msg, args) => {

};

exports.help = {
    category   : 'moderation',
    usage      : '[time:time or permanent] [reason:optional]',
    description: 'I will ban someone',
    detail     : 'When using ban the bot will ban the selected user, for the time you choose(optional)',
    botPerm    : ['SEND_MESSAGES', 'BAN_MEMBERS'],
    authorPerm : ["BAN_MEMBERS"],
    alias      : [
        null
    ]
};
