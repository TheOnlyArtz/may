const config = require('../config/config.json');
const fs     = require('fs');

let alias = {};


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
        logger.info(`${commandIndex++}). ` + 'Loaded ' + helpName + ` successfully`)
    });
});


exports.run = (client, msg) => {
    // Return if author is a client or the content of the message does not include a command
    if (msg.author.bot || !msg.content.startsWith(config.PREFIX)) return;
    // Creating the arguments array with the suffix of the content
    let args = msg.content.slice(config.PREFIX.length).trim().split(/ +/g);

    // Defining the content from the message arguments
    let command = args.shift().toLowerCase();

    // Checking if the command has the potential to be a command
    try {
        let commandFile = require('../commands/' + command + '.js');
        commandFile.run(client, msg, args);
    }
    catch (err) {
        if (alias[command]) {
            let commandFile = require('../commands/' + alias[command] + '.js');
            commandFile.run(client, msg, args).catch(handler);
        }
        else {
            logger.error(err);
        }

    }
};
