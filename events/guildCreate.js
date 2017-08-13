const config = require('../config/config.json').PREFIX
let channelsArr = [];
exports.run = async (client, guild) => {

  let Id = guild.channels.get(guild.channels.filter(i=> i.type === "text").map(i => i)[0].id);
  let p = guild.channels.filter(o => o.type === 'text').map(o => o)
  Id.send(`Hey :wave:, Thank you very much for adding me to \`${guild.name}\` to get access to the command list do \`${config}help\``);


  /**
  * Check if there's a channel with the name of may-log
  * @type {Array}
  */
  for (var i = 0; i < p.length; i++) {
    channelsArr.push(p[i].name)
  }

  /**
  * Create a channel for may to print out punishments
  * @returns {Error}
  * @returns {Promise}
  */
  if(!channelsArr.includes('may-log')) {
    guild.createChannel("may-log", "text").then(channel => channel.overwritePermissions(guild.id, {
      SEND_MESSAGES: false
    }))
    .catch(e => {
      logger.error(e)
    })
  }

  /**
  * Create muted role
  * @param {Object} data
  * @param {String} name
  * @param {String} color
  * @param {Array} permissions
  * @param {String} reason
  * @returns {Error}
  * @returns {Promise}
  */
  guild.createRole({
    data: {
      name: 'may-muted',
      color: 'BLUE',
      permissions: ["USE_VAD", "ADD_REACTIONS", "READ_MESSAGE_HISTORY", "CREATE_INSTANT_INVITE", "READ_MESSAGES"]
    },
    reason: 'we needed a role for muted',
  })
  .then(role => logger.info(`Created role ${role}`))
  .catch(e => {
    logger.error(e)
  })

  /*
    Loop through all the channels and block muted people to talk there
  */
  guild.channels.filter(textchannel => textchannel.type === 'text').forEach(cnl => {
    cnl.overwritePermissions(muteRole, {
        SEND_MESSAGES: false
    })
      .catch(e => logger.error(e))
});
}
