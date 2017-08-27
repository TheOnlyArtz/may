const table = r.table('tags');
exports.run = async (client, msg, args) => {

  const action = args[0];
  const name   = args[0] ? args[1] : undefined;
  
  /**
  *
  *
  */

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
