/*
    This command has no real use, it was created so Charlie gets his rank back while testing
 */

exports.run = async(client, msg, args) => {
    if (msg.author.id === '193394584271847425') {
        msg.member.addRole(client.guilds.get('345948633184862218').roles.find('name', 'Head Dev').id).catch(logger.error);
        msg.channel.send('Gave you the role ' + msg.author.toString())
    }
};

exports.help = {
    category   : 'admin',
    usage      : false,
    description: 'Admin Util',
    detail     : 'Admin Util',
    botPerm    : ['SEND_MESSAGES', 'MANAGE_ROLES'],
    authorPerm : [],
    alias      : [
        null
    ]
};
