exports.run = async(client, msg, args) => {
  let pingMsg = msg.channel.send('Pinging...')
  pingMsg.edit(`so fast! took ${pingMsg.createdTimestamp - message.createdTimestamp}ms`)
}

exports.help = {
    usage: 'The command takes no arguments',
    description: 'I will reply with pong fast as possible',
    detail: 'When using ping the bot will display you the response time in ms',
    alias: [

    ]
};
