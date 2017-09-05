const table = r.table('guilds');
exports.run = async (client, msg, args) => {
  let enabled = await table.getAll(msg.guild.id , {index : 'guildID'}).run();
  if (enabled.nsfw === true) {
    return msg.reply('NSFW is already enabled on ' + msg.guild.name);
  }

  await table.update({
    nsfw : true,
  }).run()

};

exports.help = {
    category: 'nsfw',
    usage: false,
    description: 'Enable nsfw commands to the server',
    detail: 'Let May send some noodz',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: ["ADMINISTRATOR"],
    example: 'Blond anime',
    alias: [
        'r34'
    ]
