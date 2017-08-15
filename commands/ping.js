exports.run = async(client, msg, args) => {
  let pingMsg = await msg.channel.send('Pinging...');
  pingMsg.edit(`Pong! Ping: ${pingMsg.createdTimestamp - msg.createdTimestamp}ms`)
};

exports.help = {
    category   : 'util',
    usage      : 'The command takes no arguments',
    description: 'I will reply with pong fast as possible',
    detail     : 'When using ping the bot will display you the response time in ms',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        null
    ]
};
