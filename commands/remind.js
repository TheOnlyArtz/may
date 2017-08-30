const table = r.table("reminders")
exports.run = async (client, msg, args) => {

};

exports.help = {
    category: 'util',
    usage: '[time] [Reminder Content]',
    description: 'Remind your self anything',
    detail: 'You can as me to remind you everything you want in the time you want, and I will do that',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: false,
    alias: [
        null
    ]
};
