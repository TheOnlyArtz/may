const snekfetch = require('snekfetch');

exports.run = async (client,msg,args) => {
    // Handle error and ask for arguments
    if (!args.join(' ')) return msg.channel.send('Please include a question');

    /**
    * @param {String} url fetch data from
    * @returns {Promise}
    * @returns {Error}
    */
    let r = await snekfetch.get("https://8ball.delegator.com/magic/JSON/0");
    let answerBall = r.body;
    let ball = answerBall.magic.answer;
    msg.channel.send("**[8 Ball]** :crystal_ball: " + ball)
};

exports.help = {
    category: 'fun',
    usage: '[question]',
    description: 'Ask the magic 8 ball something',
    detail: 'Ask the magic 8 ball something',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        '8b'
    ],
    example    : 'Are you the may from overwatch?'
};
