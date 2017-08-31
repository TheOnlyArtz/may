const instructions = require('./permInstructions.js');
const Discord = require('discord.js');

function checkForPermissions(botPermissions, authorPermissions, cmd, msg, client) {
    const embedClass = require('../classes/embedMessage.js');
    let embedMessage = new embedClass(msg);
    if (!botPermissions && !authorPermissions) {
        throw Error`You must specify the permissions for ${cmd}`;
    } else if (!cmd) {
        throw new Error(`You must specify command name`);
    }

    let botPermsMissing = [];
    let authorPermsMissing = [];
    let botInstructions = [];
    for (let i = 0; i < cmd.help.botPerm.length; i++) {
        if (!msg.guild.member(client.user).hasPermission(botPermissions[i])) {
            botInstructions.push(`${instructions[botPermissions[i]]}`);
            botPermsMissing.push(botPermissions[i]);
        }
    }
    if (botPermsMissing[0]) {
        if (!msg.guild.member(client.user).hasPermission(botPermsMissing)) {
            msg.channel.send(`= ❌Missing permissions❌ =\nMissing List: ${botPermsMissing.join(', ')}\n= Please turn on these permissions for may = \n${botInstructions.join('\n')}`, {code: 'asciidoc'})
                .catch(logger.error);
            msg.channel.send('Please read that if you do not have knowledge about roles <https://support.discordapp.com/hc/en-us/articles/214836687-Role-Management-101>');
            return true;
        }
    }
    for (let i = 0; i < cmd.help.authorPerm.length; i++) {
        if (!msg.guild.member(msg.author).hasPermission(authorPermissions[i])) {
            authorPermsMissing.push(authorPermissions[i]);
        }
    }
    if (authorPermsMissing[0]) {
        if (!msg.guild.member(msg.author).hasPermission(authorPermsMissing)) {
            msg.channel.send(`= ❌${msg.author.username} is Missing permissions❌ =\nMissing List: ${authorPermsMissing.join(', ')}`, {code: 'asciidoc'});
            return true;
        }
    }
    return false;
}

module.exports = checkForPermissions;
