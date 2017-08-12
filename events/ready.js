exports.run = (client) => {
    logger.info('May is ready to use');
    logger.debug(`Logged in as ${client.user.tag}`);
    logger.debug(`Serving ${client.guilds.size} servers with ${client.users.filter(i => !i.bot).size} users`);
    client.user.setGame('tests').catch( err => logger.error(err));
    client.user.setAvatar('https://cdn.discordapp.com/avatars/345947240612888580/37fef8675013f95c8e85bbb3510c54c0.png?size=2048').catch(err => logger.error(err))
};
