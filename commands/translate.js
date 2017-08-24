const translate = require('google-translate-api');
const config = require('../config/config.json').PREFIX;
const Discord = require('discord.js');

exports.run = async (client, msg, args) => {
    let toTrans = msg.content.split(' ').slice(1);
    let language;
    language = toTrans[toTrans.length - 2] === 'to' ? toTrans.slice(toTrans.length - 2, toTrans.length)[1].trim() : undefined;
    if (!language) {
        return msg.reply(`Please supply valid agruments.\n**Example** \`${config}translate May is my favorite bot to english\``);
    }
    let finalToTrans = toTrans.slice(toTrans.length - toTrans.length, toTrans.length - 2).join(' ');
    translate(finalToTrans, {to: language}).then(res => {
        const embed = new Discord.RichEmbed()
            .setAuthor('May\'s translator', client.user.displayAvatarURL)
            .setColor(Math.floor((Math.random() * 1600000) + 6))
            .addField('Translator:', `**From:** ${res.from.language.iso}\n\`\`\`${finalToTrans}\`\`\`\n**To: **${language}\n\`\`\`${res.text}\`\`\``);
        msg.channel.send({embed});
    }).catch(err => {
        msg.channel.send({
            embed: {
                description: '❌ We could not find the supplied language.',
                color: 0xE8642B
            }
        });
    });
};

exports.help = {
    category: 'fun',
    usage: '[Something to translate] to <language>',
    description: 'Translate words',
    detail: 'Translate words from different languages',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: 'Ich mag May to english',
    alias: [
        'trans'
    ]
};
