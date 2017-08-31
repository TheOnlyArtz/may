const table = r.table("reminders");
const ms = require('ms');
const moment = require('moment');
exports.run = async (client, msg, args) => {
    const time    = args[0];
    const content = msg.content.split(' ').slice(2).join(' ');
    if (!time) {
        return msg.reply('Please include time as first argument.');
    } else if (!time.match(/\d{1,2}(hour|h|hours|second|sec|s|seconds|d|days|day|m|minutes)\b/)) {
        return msg.reply('Please include **valid** time, look at the example `-help remind`');
    }

    if (!content) {
      return msg.reply('Please supply the content of the reminder too.');
    }

    const exists = await table.getAll(msg.guild.id, msg.author.id, {index: "guildID", index: "userID"}).run();
    const arrayExists = await table.getAll("NONE", {index: "guildID"}).run();
    let appendToArray = async (table, uArray, doc) => await r.table(table)
    .filter({guildID : 'NONE'})
    .update(object => ({ [uArray]: object(uArray)
    .default([]).append(doc) }))
    .run();
    if (!exists[0]) {
      msg.channel.send(':clock: Reminder has been set, You will be reminded in ' + ms(ms(time), {long: true}) +'\n**Content:** ' + content);
      try {

        let unformattedUnix = moment().add(ms(time), 'ms');
        await table.insert({
          userID : msg.author.id,
          guildID : msg.guild.id,
          content : content,
          time    : new Date(unformattedUnix).getTime(),
          channelID : msg.channel.id,
        }).run();
        appendToArray('reminders', 'inQueue', {userID : msg.author.id , guildID : msg.guild.id})
      } catch (e) {
        logger.error('Failed to insert reminder into the database', e);
      }
    } else {
        msg.reply('You already have 1 reminder in queue!');
    }
};

exports.help = {
    category: 'util',
    usage: '[time] [Reminder Content]',
    description: 'Remind your self anything',
    detail: 'You can as me to remind you everything you want in the time you want, and I will do that',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: [],
    example: '15m Play with my sister ♥',
    alias: [
        null
    ]
};
