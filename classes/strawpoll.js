const asnc = require('async')
class strawpoll {
  constructor(msg) {
    this.msg = msg
    this.options = []
    this.votedTo = {}
  }

  getOptions () {
    let selectedOptions = this.msg.content.split(' ').slice(1).join(',').split(',')
    if (!selectedOptions[0]) {
      return this.msg.channel.send('Please add options to the strawpoll')
    }

    if (selectedOptions.length > 5) {
      return this.msg.channel.send('Maximum options are 5')
    }
    this.options = selectedOptions
    let messageForm = [
      '```',
      `Straw poll by ${this.msg.author.username}.\n`
  ]
    for (var i = 0; i < this.options.length; i++) {
      messageForm.push(`Option ${i + 1}:: ${this.options[i]}`)
    }
    messageForm.push('```');

    let messags = messageForm.join('\n')
    return messags
  }

  startInteractiveMenu(Begin, strawMessage) {
    let cancel = false;
    if (Begin) {
      strawMessage = this.getOptions();
    }

        this.msg.channel.send(strawMessage)
        .then(async messages => {
        asnc.whilst(() => !cancel,
          callback => {
              const filter = r => r.content.match(/[0-9]/g);
              this.msg.channel.awaitMessages(filter, {
                max : 10,
                time : 60 * 1000, //1 Min
                error : ['time']
              }).then(async usersMessage => {
                const timeout = setTimeout(() => {
                  usersMessage.delete();
              }, 30000);
              let userMessage = usersMessage.first();
              const inputNo = parseInt(userMessage.content.trim());
              const inputStr = userMessage.content.trim().toLowerCase();
              if (inputNo > 0) {
                    this.votedTo = this.options.filter((game, index) => index === (inputNo - 1))[0];
                        console.log('s');
                        await this.msg.channel.send(`You chose ${this.votedTo}`);
                        cancel = true
                }
            });
        });
    });
  };
}
module.exports = strawpoll;
