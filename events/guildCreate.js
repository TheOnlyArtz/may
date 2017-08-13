const config = require('../config/config.json').PREFIX
exports.run = async (client, guild) => {

  let Id = guild.channels.get(guild.channels.filter(i=> i.type === "text").map(i => i)[0].id);
  Id.send(`Hey :wave:, Thank you very much for adding me to \`${guild.name}\` to get access to the command list do \`${config}help\``);
}
