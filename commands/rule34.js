const cooldown = require('../functions/cooldown.js');
const snekfetch = require('snekfetch');
const xml2js = require('xml2js');
const table = r.table('guilds');

exports.run = async (client, msg, args) => {
        let enabled = await table.getAll(msg.guild.id, {index : "guildID"}).run();
        if (!enabled[0] || enabled[0].nsfw !== true) {
          return msg.channel.send('NSFW commands are not enabled on this server to enable it call an admin that will do `-nsfw enable`');
        }
        if (!args[0]) {
            return msg.channel.send('Please give a search terms!');
        }
        if (cooldown(msg, 'rule34', 60, 'This command has a cooldown of **1 Minute**!')) {
        snekfetch.get('http://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=' + encodeURIComponent(args.join(' '))).then(r => {
            if (r.body.length < 75) {
                return msg.channel.send(':x: Nothing found!');
            }
            xml2js.parseString(r.body, (err, reply) => {
                if (err) {
                    msg.channel.send('The API returned an unconventional response. :thinking:');
                    return logger.error(err);
                }

                let count = Math.floor((Math.random() * reply.posts.post.length));
                msg.channel.send({files: [reply.posts.post[count].$.file_url]}).catch(err => logger.error(err));
            });
        });
    }
};
exports.help = {
    category: 'nsfw',
    usage: false,
    description: 'I will send some rule34',
    detail: 'Rule34 AKA anime NSFW pictures.',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: 'Blond anime',
    alias: [
        'r34'
    ]
};
