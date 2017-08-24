const cooldown = new Set();

/**
 *
 * @param msg {object} Message object
 * @param command {string} The command name
 * @param time time of cooldown in seconds
 * @param errMsg {string} the error message to display
 */
function cool(msg, command, time, errMsg) {
    if (['208936898566160384', '193394584271847425'].includes(msg.author.id)) {
        return true;
    }
    let toAdd = msg.author.id + msg.guild.id + command;
    if (cooldown.has(toAdd)) {
        msg.reply('**[Cooldown]**: ' + errMsg).catch(logger.error);
        return false;
    }
    cooldown.add(toAdd);
    setTimeout(() => {
        cooldown.delete(toAdd);
    }, time * 1000);
    return true;
}

module.exports = cool;
