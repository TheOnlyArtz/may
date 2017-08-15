/** @ignore */
const config = require('../config/config.json');
const fs     = require('fs');
const PermissionChecker = require('../functions/checkPerms.js');
const chalk  = require('chalk')

let alias = {};

/** Loop through all the commands files
* @var {files} for the files
* @var {err} for error handling
* @returns {Error}
* @returns {Files} returns all the files at the directory
*/
fs.readdir('./commands/', (err, files) => {
    if (err) return logger.error(err);
    let commandIndex = 1;
    files.forEach(file => {
        let
            info = require('../commands/' + file),
            helpName = file.split('.')[0],
            alias2 = info.help.alias;

        for (alia of alias2) {
            alias[alia] = helpName;
        }
        logger.info(`Command ${commandIndex++}). ` + `${chalk.cyan('Loaded ')}` + helpName + ` ${chalk.green('successfully')} ${chalk.yellow('[Command]')}`)
    });
    logger.info(chalk.cyan(`Loaded total ${commandIndex - 1} commands!`))
});

/**
* @module {alias} for the command aliases
*/
module.exports.alias = alias;


exports.run = (client, msg) => {
    // Return if author is a client or the content of the message does not include a command
    if (msg.author.bot || !msg.content.startsWith(config.PREFIX) || !msg.guild || msg.content.startsWith(client.user)) return;
    // Creating the arguments array with the suffix of the content
    let args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);

    // Defining the content from the message arguments
    let command = args.shift().toLowerCase();
    // Checking if the command has the potential to be a command
    try {
        let commandFile = require('../commands/' + command + '.js');
        if (PermissionChecker(
                require(`../commands/${command}`).help.botPerm,
                require(`../commands/${command}`).help.authorPerm,
                require(`../commands/${command}`),
                msg,
                client)) {return}


        commandFile.run(client, msg, args);
        logger.info(`${chalk.cyan(command)}` + ` has just been executed by ${chalk.yellow(msg.author.username)} [${chalk.magenta(msg.author.id)}]`)
    }
    catch (err) {
        if (alias[command]) {
            let commandFile = require('../commands/' + alias[command] + '.js');
            if (PermissionChecker(
                    require(`../commands/${alias[command]}`).help.botPerm,
                    require(`../commands/${alias[command]}`).help.authorPerm,
                    require(`../commands/${alias[command]}`),
                    msg,
                    client)) {return}
            commandFile.run(client, msg, args).catch(logger.error);
            logger.info(`${chalk.cyan(command)}` + ` has just been executed by ${chalk.yellow(msg.author.username)} [${chalk.magenta(msg.author.id)}]`)
        }
        else {
            logger.debug(err + ' this is when no alias or command');
        }

    }
};
