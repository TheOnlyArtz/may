/**
 * @member {Object}
 */
const snekfetch = require('snekfetch');
const cooldown = require('../functions/cooldown.js');

exports.run = async (client, msg, args) => {
    if (cooldown(msg, 'advice', 30, 'This command has a cooldown of **30 Seconds**!')) {
        let r = await snekfetch.get('http://api.adviceslip.com/advice');
        /**
         * @param {{slip:object}} Returned Object from API
         * @param {{advice:string}} Advice returned from API
         */
        let advice = JSON.parse(r.body).slip.advice;
        msg.channel.send('**Advice: **' + advice).catch(err => logger.error(err));
    }
};

exports.help = {
    category: 'fun',
    usage: 'takes no arguments',
    description: 'Get an useful advice',
    detail: 'Get an useful advice',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    example: false,
    alias: [
        null
    ]
};
