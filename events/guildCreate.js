const config = require('../config/config.json').PREFIX;

let channelsArr = [];
exports.run = async (client, guild) => {
    let Id = guild.channels.get(guild.channels.filter(i => i.type === 'text').map(i => i)[0].id);
    let p = guild.channels.filter(o => o.type === 'text').map(o => o);
    Id.send(`Hey :wave:, Thank you very much for adding me to \`${guild.name}\` to get access to the command list do \`${config}help\``);

    /**
     * Check if there's a channel with the name of may-log
     * @type {Array}
     */
    for (let i = 0; i < p.length; i++) {
        channelsArr.push(p[i].name);
    }

    /**
     * Create a channel for may to print out punishments
     * @returns {Error}
     * @returns {Promise}
     */
    if (!channelsArr.includes('may-log')) {
        channelsArr.shift();
        guild.createChannel('may-log', 'text').then(channel => channel.overwritePermissions(guild.id, {
            SEND_MESSAGES: false
        }))
            .catch(e => {
                logger.error(e);
            });
    }

    /*
  * Check if may-muted is already exists.
  */
    let checkIfMayMutedExists = guild.roles.filter(o => o.name === 'may-muted').map(o => o);
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
    if (checkIfMayMutedExists.length < 1) {
        guild.createRole({
            name: 'may-muted',
            permissions: ['USE_VAD', 'ADD_REACTIONS', 'READ_MESSAGE_HISTORY', 'CREATE_INSTANT_INVITE', 'READ_MESSAGES'],
            reason: 'we needed a role for muted'
        })
            .then(role => logger.info(`Created role ${role.name}`))
            .catch(e => {
                logger.error(e);
            });
    } else {
        logger.log('The role is already exists.');
    }

    /*
    Loop through all the channels and block muted people to talk there
  */
    setTimeout(() => {
        guild.channels.filter(textchannel => textchannel.type === 'text').forEach(cnl => {
            cnl.overwritePermissions(guild.roles.find('name', 'may-muted').id, {
                SEND_MESSAGES: false
            })
                .catch(e => logger.error(e));
        });
    }, 2000);

    //TODO: create document with the name of the guildID to hold all the data for the specific guild.
    r.table('guilds').filter({guildID : guild.id}).run().then(async as => {
      if (!as[0]) {
        r.table('guilds').insert({
          guildID : guild.id,
          ownerID : guild.owner.user.id,
        }).then(() => logger.info('Created document for ' + guild.name)).catch(console.error)
      } else {
        logger.info('Looks like the guild:', guild.name, 'is already inside [guilds]')
      }
    });

    r.table('livestreams').filter({guildID : guild.id}).run().then(async as => {
        if (!as[0]) {
            r.table('livestreams').insert({
                guildID: guild.id,
                streams: false,
                channelID: null,
                livestreams: [],
                id : msg.guild.id + msg.channel.id

            }).then(() => logger.info('Created document for ' + guild.name)).catch(console.error)
        } else {
            logger.info('Looks like the guild:', guild.name, 'is already inside [livestreams]')
        }
    })

};
