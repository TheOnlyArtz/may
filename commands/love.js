const cooldown = require('../functions/cooldown.js');
const config = require('../config/config.json');
const snekfetch = require('snekfetch');
exports.run = async(client, msg, args) => {
        if (!args[0] || !args[1]) return msg.channel.send('I need two names to calculate the love!');
        if (args[2]) return msg.channel.send('Please only give me 2 names');
        if (cooldown(msg, 'love', 60, 'This command has a cooldown of **1 Minute**!')) {
        let name1 = args[0];
        let name2 = args[1];
        name1 = name1.startsWith('<@') ? msg.mentions.users.first().username : name1;
        name2 = name2.startsWith('<@') ? msg.mentions.users[1].username : name2;
        let love = await snekfetch.get(`https://love-calculator.p.mashape.com/getPercentage?fname=${name1}&sname=${name2}`)
            .set("X-Mashape-Key", config.LOVEKEY)
            .set("Accept", "application/json");

        let loveName = love.body.fname;
        let loveName2 = love.body.sname;
        let lovePer = love.body.percentage;
        let loveText = love.body.result;
        let heart = lovePer > 50 ? ':heart: ' : ':broken_heart: ';
        msg.channel.send(heart + `${loveName} and ${loveName2} have a ${lovePer}% chance of falling in love!`)
    }
};
exports.help = {
    category   : 'fun',
    usage      : '[name] [name]',
    description: 'Measures the love between to persons',
    detail     : 'Get out the percentage chance that the two persons love each other',
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    example    : 'name1 name2',
    alias      : [
        'lovecalc'
    ]
};
