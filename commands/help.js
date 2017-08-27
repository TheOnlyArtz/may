const fs = require('fs');
const discord = require('discord.js');
const config = require('../config/config.json');
const alias = require('../events/message.js').alias;

exports.run = async (bot, msg, args) => {
    const embedClass = require('../classes/embedMessage.js');
    let embedMessage = new embedClass(msg);

    if (args[0]) {
        msg.delete();
        if (args[0].toLowerCase() === 'fun') {
            let comm = [];
            fs.readdir('./commands/', (err, files) => {
                if (err) {
                    logger.error(err);
                }
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'fun') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`);
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend,
                    color: 0x1FBAED
                });
            });
        } else if (args[0].toLowerCase() === 'util') {
            let comm = [];
            fs.readdir('./commands/', (err, files) => {
                if (err) {
                    logger.error(err);
                }
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'util') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`);
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend,
                    color: 0x1FBAED
                });
            });
        } else if (args[0].toLowerCase() === 'moderation') {
            let comm = [];
            fs.readdir('./commands/', (err, files) => {
                if (err) {
                    logger.error(err);
                }
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'moderation') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`);
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend,
                    color: 0x1FBAED
                });
            });
        } else if (args[0].toLowerCase() === 'music') {
            let comm = [];
            fs.readdir('./commands/', (err, files) => {
                if (err) {
                    logger.error(err);
                }
                files.forEach(file => {
                    let info = require('./' + file);
                    if (info.help.category === 'music') {
                        comm.push(`**${config.PREFIX}${file.split('.')[0]}** ${info.help.description}`);
                    }
                });
                let toSend = comm.join('\n');
                embedMessage.descEmbed({
                    type: 'desc',
                    content: toSend,
                    color: 0x1FBAED
                });
            });
        } else {
            try {
                let cmd = require('./' + args[0]);
                let help = cmd.help;
                let usageCheck = cmd.help.usage ? cmd.help.usage : '';
                let usage = config.PREFIX + args[0] + ' ' + usageCheck;
                let detail = help.detail;
                let alias3 = help.alias.join(', ');
                let embed = new discord.RichEmbed()
                    .setTitle('Command Information | ' + args[0])
                    .setDescription(detail)
                    .addField('Usage', usage)
                    .addField('Alias', alias3 ? alias3 : 'None')
                    .setTimestamp()
                    .setColor(0xb7c767)
                    .setFooter(bot.user.username);
                if (help.example) {
                    embed.addField('Example', '`' + config.PREFIX + args[0] + ' ' + help.example + '`');
                }
                msg.channel.send({embed});
            } catch (err) {
                if (alias[args[0]]) {
                    let cmd = require('./' + alias[args[0]] + '.js');
                    let help = cmd.help;
                    let usageCheck = cmd.help.usage ? cmd.help.usage : '';
                    let usage = config.PREFIX + args[0] + ' ' + usageCheck;
                    let detail = help.detail;
                    let alias2 = help.alias.join(', ');
                    let embed = new discord.RichEmbed()
                        .setTitle('Command Information | ' + alias[args[0]])
                        .setDescription(detail)
                        .addField('Usage', usage)
                        .setColor(0xb7c767)
                        .addField('Alias', alias2 ? alias2 : 'None')
                        .setTimestamp()
                        .setFooter(bot.user.username);
                    if (help.example) {
                        embed.addField('Example', '`' + config.PREFIX + alias[args[0]] + ' ' + help.example + '`');
                    }
                    msg.channel.send({embed});
                } else {
                    msg.channel.send(`:x: ${config.PREFIX}${args[0]} is not a command`);
                }
            }
        }
    } else {
        msg.delete();
        let count = 0;
        // Let batch = '';
        let funCat = [];
        let utilCat = [];
        let modCat = [];
        let musicCat = [];
        fs.readdir('./commands/', (err, files) => {
            if (err) {
                return logger.error(err);
            }
            files.forEach(file => {
                let help = '';
                count++;
                let helpInfo = require('./' + file);
                let helpName = file.split('.')[0];
                let info = helpInfo.help;
                let description = info.description;
                if (info.category === 'fun') {
                    funCat.push(`**${config.PREFIX}${helpName}** ${description}`);
                } else if (info.category === 'util') {
                    utilCat.push(`**${config.PREFIX}${helpName}** ${description}`);
                } else if (info.category === 'moderation') {
                    modCat.push(`**${config.PREFIX}${helpName}** ${description}`);
                } else if (info.category === 'music') {
                    musicCat.push(`**${config.PREFIX}${helpName}** ${description}`);
                }
            });
            // TODO: More checks if we ever have too many commands lol
            if ((funCat.join() + utilCat.join() + modCat.join() + musicCat.join()).length > 1950) {
                if ((funCat.join() + utilCat.join()).length > 1950) {
                    const embed = new discord.RichEmbed()
                        .addField('Fun Commands', funCat.join('\n'))
                        .setColor('#1FBAED');
                    if ((utilCat.join() + modCat.join() + musicCat.join()).length < 1950) {
                        const embed2 = new discord.RichEmbed()
                            .addField('Util Commands', utilCat.join('\n'))
                            .addField('Moderation Commands', modCat.join('\n'))
                            .addField('Music Commands', musicCat.join('\n') ? musicCat.join('\n') : 'None')
                            .setColor('#1FBAED');

                        msg.channel.send({embed});
                        msg.channel.send({embed: embed2});
                    } else {
                        msg.channel.send({embed});
                    }
                } else {
                    const embed = new discord.RichEmbed()
                        .addField('Fun Commands', funCat.join('\n'))
                        .addField('Util Commands', utilCat.join('\n'))
                        .setColor('#1FBAED');
                    const embed2 = new discord.RichEmbed()
                        .addField('Moderation Commands', modCat.join('\n'))
                        .addField('Music Commands', musicCat.join('\n') ? musicCat.join('\n') : 'None')
                        .setColor('#1FBAED');

                    msg.channel.send({embed});
                    msg.channel.send({embed: embed2});
                }
            } else {
                const embed = new discord.RichEmbed()
                    .addField('Fun Commands', funCat.join('\n'))
                    .addField('Util Commands', utilCat.join('\n'))
                    .addField('Moderation Commands', modCat.join('\n'))
                    .addField('Music Commands', musicCat.join('\n') ? musicCat.join('\n') : 'None')
                    .setColor('#1FBAED');
                msg.channel.send({embed});
            }
        });
    }
};

exports.help = {
    category: 'util',
    usage: '[command Name]',
    description: 'shows the commands',
    detail: 'shows the commands',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    alias: [
        'h',
        'halp'
    ]
};
