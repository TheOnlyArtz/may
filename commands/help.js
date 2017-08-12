const
    discord = require('discord.js'),
    config = require('../config/config.json'),
    fs = require('fs');

exports.run = async (bot,msg,args) => {
    if (args[0]) {
        msg.delete();
        try {
            let
                cmd = require('./' + args[0]),
                help = cmd.help,
                usage = config.PREFIX + args[0] + ' ' + help.usage,
                detail = help.detail,
                alias = help.alias.join(', '),
                embed = new discord.RichEmbed()
                    .setTitle('Command Information | ' + args[0])
                    .setDescription(detail)
                    .addField('Usage', usage, true)
                    .addField('Alias', alias ? alias : 'None', true)
                    .setTimestamp()
                    .setFooter('May-Charlie');
            msg.channel.send({embed});
        } catch (err) {
            msg.channel.send(`:x: ${config.PREFIX}${args[0]} ist no command`)
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
                    usage = info.usage,
                    description = info.description;
                help += `**${config.PREFIX}${helpName}** ${usage}\n\t${description}\n`;
                let newBatch = batch + '\n' + help;
                if (newBatch.length > (1024 - 8)) {
                    msg.channel.send(newBatch);
                    batch = help;
                }
                else {
                    batch = newBatch;
                }
            });
            batch += `\nTotal Command Count: ${count}`;
            msg.channel.send(batch)
        });

    }

};

exports.help = {
    usage: '[command Name]',
    description: 'Alle commands',
    detail: 'Alle commands',
    alias: [
        'h',
        'halp'
    ]
};
