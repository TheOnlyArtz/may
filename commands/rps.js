const
    rps = [
        'scissors',
        'rock',
        'paper'
    ],
    rpsF = (userAns, botAns) => {
        let choice = userAns,
            botChoice = botAns;
        if (choice === 'rock') {
            if (botChoice === 'scissors') {
                return 'won';
            } else if (botChoice === 'paper') {
                return 'lost';
            }

            return 'draw';
        } else if (choice === 'paper') {
            if (botChoice === 'rock') {
                return 'lost';
            } else if (botChoice === 'scissors') {
                return 'won';
            }

            return 'draw';
        } else if (choice === 'scissors') {
            if (botChoice === 'rock') {
                return 'lost';
            } else if (botChoice === 'paper') {
                return 'won';
            }

            return 'draw';
        }
    };

exports.run = async (client, msg, args) => {
    if (!args[0]) {
        return msg.channel.send('Please choose rock, paper or scissors');
    }
    let choice = args[0].toLowerCase();
    choice = choice === 'r' ? 'rock' : choice;
    choice = choice === 'p' ? 'paper' : choice;
    choice = choice === 's' ? 'scissors' : choice;
    if (!rps.includes(choice)) {
        return msg.channel.send('Please choose rock (r), paper (p) or scissors (s)');
    }
    let rand = Math.floor(Math.random() * 3);
    let botChoice = rps[rand];
    let result = rpsF(choice, botChoice);
    let answer = '';

    if (result === 'won') {
        answer = ':trophy: Congratulations, you **won** :trophy: \nYour choice: `' + choice + '` | Bot\'s Choice: `' + botChoice + '`';
    } else if (result === 'lost') {
        answer = ':x: Awww, you **lost** :x: \nYour choice: `' + choice + '` | Bot\'s Choice: `' + botChoice + '`';
    } else if (result === 'draw') {
        answer = ':neutral_face: It\'s a **draw** :neutral_face:\nYour choice: `' + choice + '` | Bot\'s Choice: `' + botChoice + '`';
    }

    msg.channel.send(answer);
};

exports.help = {

    usage: '[choice]',
    description: 'Rock, Paper or Scissors',
    detail: 'Rock, Paper or Scissors',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    category: 'fun',
    example: 'rock',
    alias: [
        null
    ]
};
