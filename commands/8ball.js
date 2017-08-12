const snekfetch = require('snekfetch');

exports.run = async (client,msg,args) => {
    if (!args.join(' ')) return msg.channel.send('Please include a question');
    let r = await snekfetch.get("https://8ball.delegator.com/magic/JSON/0");
    let answerBall = r.body;
    let ball = answerBall.magic.answer;
    msg.channel.send("**[8 Ball]** :crystal_ball: " + ball);
};

exports.help = {
    usage: '[question]',
    description: 'Ask the magic 8 ball something',
    detail: 'Ask the magic 8 ball something',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : ['SEND_MESSAGES'],
    category : "fun",
    alias      : [
        '8b'
    ]
};