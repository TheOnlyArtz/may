const table = r.table('tags');
exports.run = async (client, msg, args) => {
  let exists = await table.filter({guildID : msg.guild.id, userID : msg.author.id}).run();

  const action  = args[0];
  const name    = args[0] ? args[1] : undefined;
  const content = name ? msg.content.split(' ').slice(3).join(' ') : undefined;

   if (action === 'register') {
      console.log(name, "NAME", content, "CONTENT");
      if (!exists[0]) {
        await table.insert({
          userID  : msg.author.id,
          guildID : msg.guild.id,
          tags    : [{
            name    : name,
            content : content
          }]
        }).run()
      } else {
        // TODO: Find a way of adding object to the array and not deleting it
        await table.update({
          userID  : msg.author.id,
          guildID : msg.guild.id,
          tags : [{
            name    : name,
            content : content
          }]
        }).run()
      }
   } else {
     let tagName = action
     let tagValue = exists[0]['tags'].filter(o => o.name === tagName)[0]['content']
     msg.channel.send(tagValue)
   }

};

exports.help = {
    category: 'fun',
    usage: 'register [name][content] : -tag [name]',
    description: 'register and use tags for saying things',
    detail: 'By using tag you will able to make custom tags that will say things',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    alias: [
        'ta'
    ],
    example: 'register tagName This message will apear when doing -tag tagName'
};
