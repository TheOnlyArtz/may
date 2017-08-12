const snekfetch = require('snekfetch');

exports.run = async (client,msg,args) => {
    msg.delete();
    let r = await snekfetch.get("http://api.adviceslip.com/advice");
    let advice = JSON.parse(r.body).slip.advice;
    msg.channel.send(advice);
};

exports.help = {
    category: "fun",
    usage: 'takes no arguments',
    description: 'Get an useful advice',
    detail: 'Get an useful advice',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : ['SEND_MESSAGES'],
    alias      : [
        null
    ]
};
