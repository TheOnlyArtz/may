const sf = require('snekfetch');
const cooldown = require('../functions/cooldown.js');
const discord = require('discord.js');

exports.run = async (bot,msg,args) => {
    if (cooldown(msg, 'strawpoll', 60, 'This command has a cooldown of **1 Minute**!')) {
        if (!args[0] || !args[1] || !args[2] || !args.join().includes('"')) return msg.channel.send('Please give at least 2 options and a title.');
        let title = args.join(' ').split('"')[1];
        if (args.slice(title.split(' ').length).join(' ').split(',').length < 2) return msg.channel.send('Please give at least 2 options');
        let poll = await sf.post('https://strawpoll.me/api/v2/polls').send({
            "title": title,
            "options": args.slice(title.split(' ').length).join(' ').split(','),
            "multi": false
        });
        msg.delete();
        const embed = new discord.RichEmbed()
            .setTitle('Strawpoll | \'' + title + '\'')
            .setDescription(`[Click here for the strawpoll](http://strawpoll.me/${poll.body.id})`)
            .setColor('#eacd10')
            .addField('Strawpoll created from:', msg.author.tag)
            .addField('Choices:', poll.body.options.join('\n'));

        msg.channel.send({embed})
    }

};

exports.help = {
    category: 'util',
    usage: '"title of poll" [poll options (separated with `,`)]',
    description: 'Creates a strawpoll',
    detail: 'Creates a new strawpoll with given options',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        null
    ]
};



