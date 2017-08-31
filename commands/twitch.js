/** @ignore */
const https = require('https');
const Discord = require('discord.js');
const config = require('../config/config.json');
const twitchClass = require('../classes/twitch.js');

const twitch = new twitchClass(config.CLIENTID);
exports.run = async (client, msg, args) => {
    if (!args[0]) {
        return msg.channel.send('Please give a valid argument.');
    }
    let arg = args[0].toLowerCase();
    if (arg === 'register') {

      /**
      * Checking for a channel in the message content (twitch)
      */
      if (!args[1]) return msg.reply('Please type a name of a twitch channel');

      try {
        // Register a new channel (Get data)
        let status = await twitch.register(args[1]);

        /**
        * Check if the response status aint 404
        * Else, return invalid twitch channel
        */
        if (status.body.status !== 404) {
          let ifRowExists = await r.table("livestreams").getAll(msg.guild.id, {index : "guildID"}).run()

          //If a row does not exists create one.
          if (!ifRowExists[0]) {
            await r.table("livestreams").insert({
              guildID: msg.guild.id,
              streams: false,
              channelID: null,
              livestreams: [],
              id : msg.guild.id + msg.channel.id
            }).run();

            // Success message
            return msg.channel.send('I\'ve inserted you to the database please do the command again.');
          }


          // check if the guild is already inside the DB
          if (!ifRowExists[0] || !ifRowExists[0].streams) {
            return msg.channel.send('You have stream announcements turned off. Turn them on to add streamers. use `-twitch enable #textChannel`');
          }

          let streams = ifRowExists[0].livestreams

          // Check if the channel was already inserted
          if (streams.filter(o => o.name === args[1])[0]) {
            return msg.channel.send('This channel was already inserted!');
          }

          /**
          * Push the new streamer right into the array.
          * @param {String} table - The table name
          * @param {String} uArray - The name of the array to update
          * @param {Object} doc - The updated object to insert
          */
          let appendToArray = (table, uArray, doc) => r.table(table)
          .getAll(msg.guild.id, {index: "guildID"})
          .update(object => ({ [uArray]: object(uArray)
          .default([]).append(doc) }))
          .run();
          appendToArray('livestreams', 'livestreams', {
              game: null,
              views: null,
              image: null,
              mature: null,
              lang: null,
              name: args[1],
              url: null,
              online: false,
              msgID: null
          });

          // Success message.
         msg.channel.send(`I've added the streamer **${args[1]}** to the list`);

        } else {

          // Else send an error message.
          return msg.reply('We could not find that channel when quering.');

        }

      } catch (e) {

        // Catch any error.
        logger.debug(e);
        return msg.reply('We could not find that channel when quering.');

      }
    }

    if (arg === 'enable') {

      // Check if a text channel is being mentioned.
      if (!args || !msg.mentions.channels.first()) {
        return msg.reply('Please be sure to mention the text channel, `-twitch enable #channelOfChoice`');
      }

      // If any error's happening in the process handle it.
      try {

        // Filter the row
        let checkIfExists = await r.table("livestreams").getAll(msg.guild.id, {index: "guildID"}).run();

        // if does not exists create a document AKA row.
        if (!checkIfExists[0]) {
          await r.table("livestreams").insert({
            guildID: msg.guild.id,
            streams: false,
            channelID: null,
            livestreams: [],
            id : msg.guild.id + msg.channel.id
          }).run();

          // Success message
          return msg.channel.send('I\'ve inserted you to the database please do the command again.');
        }

        // Check if a channel is already exists in the database and update if so.
        if (checkIfExists[0].streams === true) {

          // Update the databse to the new channel
          await r.table('livestreams').getAll(msg.guild.id, {index: "guildID"}).update({channelID: msg.mentions.channels.first().id}).run();
          await msg.channel.send('You already enabled the stream announcements, I\'ve updated the channel for you :)')

        } else {

          // Else, Insert rows into the database and in Queue.
          await r.table('livestreams').getAll(msg.guild.id, {index: "guildID"})
          .update({streams : true, channelID: msg.mentions.channels.first().id})
          .run();

          /**
          * Push the new info right into the array which will be used to loop through.
          * @param {String} table - The table name
          * @param {String} uArray - The name of the array to update
          * @param {Object} doc - The updated object to insert
          */
          let arr = await r.table("livestreams").getAll("NONE", {index : "guildID"}).run()
          if (!arr.filter(o => o.guildID === msg.guild.id)[0]) {
            let appendToArray = (table, uArray, doc) => r.table(table)  // choose the table
            .getAll("NONE", {index: "guildID"}) //Filter with your custom choice
            .update(object => ({ [uArray]: object(uArray) // Get the array name
            .default([]).append(doc) })) // append the array and update
            .run();

            // call the function
            appendToArray('livestreams', 'inQueue', {guildID : msg.guild.id, channelID: msg.channel.id})
          }

        }

      } catch (e) {
        logger.error(e)
      }
    }

    if (arg === 'disable') {

      let exists = await r.table('livestreams').getAll(msg.guild.id, {index : "guildID"}).run();

      // check if the guild has a document
      // Check if streams is already off.
      if (exists[0].streams === false || !exists[0]) {
        return msg.reply('Streams already turned off!')
      }

      // Update the database.
      await r.table('livestreams')
      .getAll(msg.guild.id, {index : "guildID"})
      .update({channelID: null, streams: false, livestreams : []})
      .run();

    }

    if (arg === 'list') {

      // Get the guild object from the database
      let list = await r.table("livestreams").getAll(msg.guild.id, {index : "guildID"}).run();

      // Check if livestreams exists for this list.
      if (!list[0] || !list[0].livestreams[0]) {
        return msg.reply('This guild does not have any streamers hooked up.');
      }

      //Loop through all of the streamers
      let c = 1;
      let strms = [];
      list[0].livestreams.forEach(oo => {
        strms.push(`${c++}). ${oo.name}`);
      });

      let textarr = [
        '```asciidoc',
        `= Streamers List For ${msg.guild.name} = `,
        `${strms.join('\n')}`,
        '```'
      ]
      //handle any error
      // Fetch the list
      try{await msg.channel.send(textarr.join('\n'))} catch(e) {logger.error(e)}


    }

};

exports.help = {
    category: 'util',
    usage: '[register/enable/list/disable] [stream:only needed with register & remove/channel:Used for enable]',
    description: 'Enabled and add Twitch streams',
    detail: 'Enable: Add the channel where you want to receive stream announcements | Register: Add a new channel to the announcements \n| Remove: Remove a channel from announcements | Disable: Disable the function (default)',
    botPerm: ['SEND_MESSAGES', 'EMBED_LINKS'],
    authorPerm: ["ADMINISTRATOR"],
    alias: [
        null
    ]
};
