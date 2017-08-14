const
    discord = require('discord.js'),
    config = require('../config/config.json'),
    fs = require('fs'),
    alias = require('../events/message.js').alias;

exports.run = async (bot,msg,args) => {
  const embedClass  = require('../classes/embedMessage.js');
    let = embedMessage      = new embedClass(msg)

    if (args[0]) {
        msg.delete();
        if (args[0].toLowerCase() === 'fun') {
            let comm = [];
            fs.readdir('./commands/', (err,files) => {
                if (err) logger.error(err);
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'fun') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`)
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend
                })
            });

        }
        else if (args[0].toLowerCase() === 'util') {
            let comm = [];
            fs.readdir('./commands/', (err,files) => {
                if (err) logger.error(err);
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'util') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`)
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend
                })
            });

        }
        else if (args[0].toLowerCase() === 'moderation') {
            let comm = [];
            fs.readdir('./commands/', (err,files) => {
                if (err) logger.error(err);
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'moderation') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`)
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend
                })
            });

        }
        else if (args[0].toLowerCase() === 'music') {
            let comm = [];
            fs.readdir('./commands/', (err,files) => {
                if (err) logger.error(err);
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'music') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`)
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend
                })
            });

        }
        else {
            try {
                let
                    cmd = require('./' + args[0]),
                    help = cmd.help,
                    usage = config.PREFIX + args[0] + ' ' + help.usage,
                    detail = help.detail,
                    alias3 = help.alias.join(', '),
                    embed = new discord.RichEmbed()
                        .setTitle('Command Information | ' + args[0])
                        .setDescription(detail)
                        .addField('Usage', usage)
                        .addField('Alias', alias3 ? alias3 : 'None')
                        .setTimestamp()
                        .setFooter(bot.user.username);
                msg.channel.send({embed});
            } catch (err) {
                if (alias[args[0]]) {
                    let cmd = require('./' + alias[args[0]] + '.js'),
                        help = cmd.help,
                        usage = config.PREFIX + alias[args[0]] + ' ' + help.usage,
                        detail = help.detail,
                        alias2 = help.alias.join(', '),
                        embed = new discord.RichEmbed()
                            .setTitle('Command Information | ' + alias[args[0]])
                            .setDescription(detail)
                            .addField('Usage', usage)
                            .addField('Alias', alias2 ? alias2 : 'None')
                            .setTimestamp()
                            .setFooter(bot.user.username);
                    msg.channel.send({embed});
                }
                else {
                    msg.channel.send(`:x: ${config.PREFIX}${args[0]} is no command`)
                }
            }
        }
    }
    else {
        msg.delete();
        let count = 0;
        let batch = '';
        fs.readdir('./commands/', (err, files) => {
            if (err) return logger.error(err);
            files.forEach(file => {
                let help = "";
                count++;
                let
                    helpInfo = require('./' + file),
                    helpName = file.split('.')[0],
                    info = helpInfo.help,
                    description = info.description;
                if (info.category === 'fun') {
                    help += `**${config.PREFIX}${helpName}** ${description}\n`
                }
                else if (info.category === 'util') {
                    help += `**${config.PREFIX}${helpName}** ${description}\n`
                }
                else if (info.category === 'moderation') {
                    help += `**${config.PREFIX}${helpName}** ${description}\n`
                }
                else if (info.category === 'music') {
                    help += `**${config.PREFIX}${helpName}** ${description}\n`
                }
                let newBatch = batch + help;
                if (newBatch.length > (1024 - 8)) {
                    msg.channel.send({
                      embed : {
                        description : newBatch
                      }
                    });
                    batch = help;
                }
                else {
                    batch = newBatch;
                }
            });
            batch += `\nTotal Command Count: ${count}`;
            msg.channel.send({
              embed : {
                description : batch
              }
            });
        });

    }

};

exports.help = {
    category: 'util',
    usage: '[command Name]',
    description: 'shows the commands',
    detail: 'shows the commands',
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : ['SEND_MESSAGES'],
    alias      : [
        'h',
        'halp'
    ]
};
