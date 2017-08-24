exports.run = async (client, msg, args) => {
    let hugMoji = client.emojis.find('name', 'Hug');
    const target = msg.mentions.users.last() === client.user ? msg.mentions.users.first() : msg.mentions.users.last();

    if (!target || target === client.user) {
        return msg.reply('Please mention someone.');
    }

    const hugSentences = [
        `There you go ${target.username} I love you ♥`,
        `Oh... ${target.username} I got you buddy ${hugMoji}`,
        `Come here ${target.username} ♥`,
        `You are so sweet ${target.username} come get a hug!`,
        `Come here ${target.username} my hug will make your day better. ${hugMoji}`
    ];

    msg.channel.send(hugSentences[Math.floor(Math.random() * hugSentences.length)]);
};

exports.help = {
    category: 'fun',
    usage: '[mention]',
    description: 'Hugggg',
    detail: 'Give your friend a hug.',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: '@user#3476',
    alias: [
        'hu'
    ]
};
