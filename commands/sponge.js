const sponge = require('spongeuscator');

exports.run = async (client, msg, args) => {
    if (args.join(' ').length < 4) {
        return msg.channel.send('Please give a message with more than 4 chars');
    }
    msg.channel.send(sponge(args.join(' ')));
};

exports.help = {
    usage: '[text]',
    description: 'SPOngEbOB',
    detail: 'SPOngEbOB',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    category: 'fun',
    example: 'I like may',
    alias: [
        null
    ]
};
