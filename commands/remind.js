const table = r.table("reminders")
exports.run = async (client, msg, args) => {
    const time    = args[0];
    const content = msg.content.split(' ').slice(2).join(' ');
    if (!time) {
        return msg.reply('Please include time as first argument')
    } else if (!time.match(/\d{1,2}(hour|h|hours|second|sec|s|seconds|d|days|day|m|minutes)\b/)) {
        return msg.reply('Please include **valid** time, look at the example `-help remind`');
    }

    const exists = await table.orderBy({index: msg.guild.id}).run()[0]
    console.log(exists);
};

exports.help = {
    category: 'util',
    usage: '[time] [Reminder Content]',
    description: 'Remind your self anything',
    detail: 'You can as me to remind you everything you want in the time you want, and I will do that',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: '15m Play with my sister ♥',
    alias: [
        null
    ]
};
