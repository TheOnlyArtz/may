const c = require('../classes/embedMessage.js');
exports.run = async(client, msg, args) => {
  let embed = new c({type: "desc", content: "This is a test for description"}, msg)
  let pingMsg = await msg.channel.send('Pinging...');
  pingMsg.edit(`so fast! took ${pingMsg.createdTimestamp - msg.createdTimestamp}ms`)
  embed.descEmbed();
};

exports.help = {
    category   : 'util',
    usage      : 'The command takes no arguments',
    description: 'I will reply with pong fast as possible',
    detail     : 'When using ping the bot will display you the response time in ms',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : ['SEND_MESSAGES'],
    alias      : [
        null
    ]
};
