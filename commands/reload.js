const alias = require('../events/message.js').alias;
exports.run = async(client, msg, args) => {
  if (!args || args.length < 1) return msg.reply('Please type the command name to reload');

  let command;
  if (require('./' + args[0])) {
    command = require('./' + args[0])
  } else if(alias[args[0]]) {
    command = require('./' + alias[args[0]])
  }
  console.log(command);
  delete require.cache[require.resolve(`./` + args[0])]
  const cmd = require('./' + args[0])
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
