class strawpoll {
  constructor(options, msg) {
    this.msg = msg
    this.options = options
  }

  getOptions () {
    let selectedOptions = this.msg.content.split(' ').slice(1).join(',').split(',')
    if (!selectedOptions) {
      return this.msg.channel.send('Please add options to the strawpoll')
    }
    let messageForm = [
      '```',
      'Title Soon.'
  ]
    for (var i = 0; i < selectedOptions.length; i++) {
      messageForm.push(selectedOptions[i])
    }
    messageForm.push('```');
    this.msg.channel.send(messageForm.join('\n'))
    this.options.push(selectedOptions)
    console.log(this.options);
  }
}
module.exports = strawpoll;
