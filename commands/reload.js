const alias = require('../events/message.js').alias;
exports.run = async(client, msg, args) => {
  if (!args || args.length < 1) return msg.reply('Please type the command name to reload');

  let command;
  if (require('./' + args[0])) {
    command = args[0]
  }

  try {
    delete require.cache[require.resolve(`./` + command[0])];
    msg.channel.send(`Reloaded command ${command}`);
  } catch (e) {
    msg.channel.send(`**${command}** Does not exists.`)
  }

};

exports.help = {
    category   : 'dev only',
    usage      : '[command name]',
    description: 'Reloads a command',
    detail     : 'Reload the command code without need of restarting the bot.',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        null
    ]
};
