const sf = require('snekfetch');

exports.run = async (bot,msg,args) => {
    if (!args[0] || !args[1] || !args[2] || !args.join().includes('"')) return msg.channel.send('Please give at least 2 options and a title.');
    let title = args.join(' ').split('"')[1];
    console.log(args.slice(title.split(' ').length).join(' ').split('""'));
    let poll = await sf.post('https://strawpoll.me/api/v2/polls').send({
        "title": title,
        "options": args.slice(title.split(' ').length).join(' ').split('""'),
        "multi": false
    });
    msg.channel.send(`http://strawpoll.me/${poll.body.id}`)
};

exports.help = {
    category: 'util',
    usage: '[title in " (quotes)] [poll options (every options in " (quotes)]',
    description: 'Creates a strawpoll',
    detail: 'Creates a new strawpoll with given options',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    alias      : [
        null
    ]
};



