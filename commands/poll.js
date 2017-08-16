const strawpoll = require('../classes/strawpoll.js')
exports.run = async(client, msg, args) => {
  const s = new strawpoll([], msg)
  s.getOptions()
};

exports.help = {
    category   : 'fun',
    usage      : '[time:time or permant] [options:deviding by ","]',
    description: 'Let everyone take place in your decision',
    detail     : 'When using strawpoll you can make polls to decide things.',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        'poll'
    ]
};
