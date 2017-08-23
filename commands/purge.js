exports.run = async(client, msg, args) => {
    let messagecount = parseInt(args, 10);
    /*
  Check if msg is higher or lower then the limits
 */
    if (!messagecount) {
        return msg.reply('How many messages?');
    }
    if (messagecount > 100) {
        return msg.reply(`Purge has limits: you cant delete 101 messages per purge`);
    }
    /*
    Actual purge
    */
    let ms;
    if (messagecount === 1) {
        ms = 2;
    } else {
        ms = messagecount;
    }
    msg.channel.fetchMessages({limit: messagecount}).then(async messages => {
        msg.channel.bulkDelete(ms)
    })
        .catch(err => {
            logger.error(err, msg.channel.send('I cant delete msg that are older than a 14 days'));
        })
        .catch(e => logger.error(e));
    setTimeout(function () {
        let promise = msg.channel.send(`Deleted \`${messagecount}\` messages`).then(m => m.delete(1500))
    }, 1500);
};


exports.help = {
    category   : 'util',
    usage      : '[amount:integer]',
    description: 'I will delete the amount of messages you want',
    detail     : 'When using purge the bot delete the amount of requested messages',
    botPerm    : ['MANAGE_MESSAGES', "SEND_MESSAGES"],
    authorPerm : ['MANAGE_MESSAGES'],
    alias      : [
        'pur'
    ]
};
