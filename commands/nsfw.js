const table = r.table('guilds');
exports.run = async (client, msg, args) => {
  const action = args[0];

  let enabled = await table.getAll(msg.guild.id , {index : 'guildID'}).run();


  if (!enabled[0]) {

    await r.table('guilds').insert({
      guildID : guild.id,
      ownerID : guild.owner.user.id,
    })

    return msg.reply('I got you into the database, Please do the command again')
  }
  if (args[0] === 'enable') {
    if (enabled[0].nsfw === true) {
      return msg.reply('NSFW is already enabled off for ' + msg.guild.name);
    }

    await table.update({
      nsfw : true,
    }).run()

    msg.reply('I\'ve just turned on NSFW commands, Enjoy some noodz')
  }

  if (args[0] === 'disable') {
    if (enabled[0].nsfw === false) {
      return msg.reply('NSFW is already enabled off for ' + msg.guild.name);
    }

    await table.update({
      nsfw : false,
    }).run()

    msg.reply('I\'ve just turned off NSFW commands, #NoNoodzForYou!')
  }

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
}
