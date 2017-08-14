/** @ignore */
const snekfetch = require('snekfetch');

exports.run = async (client,msg,args) => {
    msg.delete(); //Deletes the message

    /**
    * @param {String} url where to fetch data from
    * @returns {Promise}
    * @returns {Error}
    */
    let r = await snekfetch.get("http://api.adviceslip.com/advice");
    let advice = r.body;
    msg.channel.send(advice)
      .catch(e => logger.error(e))
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
