const
    Discord = require('discord.js'),
    snekfetch = require('snekfetch');

exports.run = (client, msg, args) => {
    if (!['208936898566160384', '193394584271847425'].includes(msg.author.id)) return;
    function clean(text) {
        if (typeof(text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }
    function token(input) {
        if (typeof(input) === 'string') {
            return input.replace(msg.client.token, "{Secret Token}")
        } else if(typeof(input) === 'object') {
            if(Array.isArray(input)){
                function hasToken(value) {
                    if(typeof(value) !== 'string') {
                        return true;
                    }else {
                        return value !== msg.client.token;
                    }
                }
                return input.filter(hasToken);
            } else {
                return input;
            }
        } else {
            return input;
        }
    }
    try {
        let code = args.join(" ");
        let evaled = eval(code);
        let func = token(clean(evaled));
        if (typeof func !== "string") func = require("util").inspect(func);
        const output = '```js\n' + func + '\n```';
        const Input = '```js\n' + msg.content.slice(6) + '\n```';
        let type = typeof(evaled);
        if(func.length < 1000) {
            const embed = new Discord.RichEmbed()
                .addField('EVAL', `**Type:** ${type}`)
                .addField(':inbox_tray: Input', Input)
                .addField(':outbox_tray: Output', output)
                .setColor(0x80ff00)
                .setFooter('May ')
                .setTimestamp();
            msg.channel.send({embed});
        }else {
            snekfetch.post("https://www.hastebin.com/documents").send(func)
                .then(res  => {
                    const embed = new Discord.RichEmbed()
                        .addField('EVAL', `**Type:** ${type}`)
                        .addField(':inbox_tray: Input', Input)
                        .addField(':outbox_tray: Output', `Output was to long so it was uploaded to hastebin https://www.hastebin.com/${res.body.key}.js `, true)
                        .setFooter('May ')
                        .setColor(0x80ff00);
                    msg.channel.send({embed});
                })
                .catch(err => {
                    logger.error(err);
                    const embed = new Discord.RichEmbed()
                        .addField('EVAL', `**Type:** ${type}`)
                        .addField(':inbox_tray: Input', Input)
                        .addField(':x: ERROR', `Output was to long and could not upload to hastebin`, true)
                        .setFooter('May ')
                        .setColor(0x80ff00);
                    msg.channel.send({embed});
                });
        }
    } catch (err) {
        let errIns = require("util").inspect(err);
        const error = '```js\n' + errIns + '\n```';
        const Input = '```js\n' + msg.content.slice(6) + '\n```';
        if(errIns.length < 1000)
        {
            const embed = new Discord.RichEmbed()
                .addField('EVAL', `**Type:** Error`)
                .addField(':inbox_tray: Input', Input)
                .addField(':x: ERROR', error, true)
                .setFooter('May ')
                .setColor(0x80ff00);
            msg.channel.send({embed});
        } else {
            snekfetch.post("https://www.hastebin.com/documents").send(errIns)
                .then(res  => {
                    const embed = new Discord.RichEmbed()
                        .setTitle('Eval Error')
                        .addField('EVAL', `**Type:** Error`)
                        .addField(':inbox_tray: Input', Input)
                        .addField(':x: ERROR', '```' + err.name + ': ' + err.message + '```', true)
                        .setURL(`https://www.hastebin.com/${res.body.key}.js`)
                        .setFooter('May ')
                        .setColor(0x80ff00);
                    msg.channel.send({embed});
                })
                .catch(err => {
                    logger.error(err);
                    const embed = new Discord.RichEmbed()
                        .addField('EVAL', `**Type:** Error`)
                        .addField(':inbox_tray: Input', Input)
                        .addField(':x: ERROR', `output was to long and could not upload to hastebin :/`, true)
                        .setFooter('May ')
                        .setColor(0x80ff00);
                    msg.channel.send({embed});
                });
        }
    }

};

exports.help = {
    category   : 'DeveloperOnly',
    usage      : '<code>',
    description: 'Eval',
    detail     : 'Eval',
    botPerm    : ['SEND_MESSAGES', "EMBED_LINKS"],
    authorPerm : [],
    alias      : [
        null
    ]
};
