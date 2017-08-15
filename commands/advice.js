/** @ignore */
const snekfetch = require('snekfetch');
const cooldown = new Set();

exports.run = async (client,msg,args) => {
    let toAdd = msg.author.id + msg.guild.id;
    if (cooldown.has(toAdd)) {
        return msg.reply('**[COOLDOWN]** Info command has **30 Seconds** Cooldown!');
    }
    cooldown.add(toAdd);

    setTimeout(() => {
        cooldown.delete(toAdd);
    }, 30000);
    msg.delete(); //Deletes the message

    /**
    * @param {String} url where to fetch data from
    * @returns {Promise}
    * @returns {Error}
    */
    let r = await snekfetch.get("http://api.adviceslip.com/advice");
    let advice = JSON.parse(r.body).slip.advice;
    msg.channel.send('**Advice: **' + advice).catch(e => logger.error(e))
};

exports.help = {
    category: "fun",
    usage: 'takes no arguments',
    description: 'Get an useful advice',
    detail: 'Get an useful advice',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        null
    ]
};
