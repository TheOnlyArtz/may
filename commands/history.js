
exports.run = async (client, msg, args) => {

  let exists = await r.table('ModHistory').filter({
    guildID : msg.guild.id,
    userID  : msg.mentions.users.first().id
  }).run()

  let textArray =  [
    `= History for ${msg.mentions.users.first().username} =`,
    `Bans: ${exists[0] && exists[0]['banCount'] ? exists[0]['banCount'] : 0}`,
    `Mutes: ${exists[0] && exists[0]['muteCount'] ? exists[0]['muteCount'] : 0}`,
    `Kicks: ${exists[0] && exists[0]['kickCount'] ? exists[0]['kickCount'] : 0}`,
    `Softbans: ${exists[0] && exists[0]['softbanCount'] ? exists[0]['softbanCount'] : 0}`,
    `Warns: ${exists[0] && exists[0]['warnCount'] ? exists[0]['warnCount'] : 0}`,
  ]

  msg.channel.send(textArray.join('\n'), {code : "asciidoc"})
};

exports.help = {
    category: 'moderation',
    usage: false,
    description: 'Shows mentioned user punishment history',
    detail: 'When using history you can take a look at detailed amount of punishments of any kind the user got',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: '@user#5743',
    alias: [
        null
    ]
};
