const table = r.table('tags');
exports.run = async (client, msg, args) => {
  let exists = await table.filter({userID : msg.author.id}).run();

  const action  = args[0];
  const name    = args[0] ? args[1] : undefined;
  const content = name ? msg.content.split(' ').slice(3).join(' ') : undefined;

   if (action === 'register') {
      if (!exists[0]) {
        await table.insert({
          userID  : msg.author.id,
          tags    : [{
            name    : name,
            content : content
          }]
        }).run()
      } else {
        let appendToArray = (table, uArray, doc) => r.table(table).filter({userID : msg.author.id}).update(object => ({ [uArray]: object(uArray).default([]).append(doc) })).run();
        // TODO: Find a way of adding object to the array and not deleting it
        appendToArray('tags', 'tags', {name : name, content : content})
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
