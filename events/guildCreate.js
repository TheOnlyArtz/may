const config = require('../config/config.json').PREFIX
let channelsArr = [];
exports.run = async (client, guild) => {

  let Id = guild.channels.get(guild.channels.filter(i=> i.type === "text").map(i => i)[0].id);
  let p = guild.channels.filter(o => o.type === 'text').map(o => o)
  Id.send(`Hey :wave:, Thank you very much for adding me to \`${guild.name}\` to get access to the command list do \`${config}help\``);

  for (var i = 0; i < p.length; i++) {
    channelsArr.push(p[i].name)
  }

  if(!channelsArr.includes('may-log')) {
    guild.createChannel("may-log", "text").then(channel => channel.overwritePermissions(guild.id, {
      SEND_MESSAGES: false
    }))
    .catch(e => {
      logger.error(e)
    })
  }
}
