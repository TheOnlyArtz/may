const table = r.table('tags');
exports.run = async (client, msg, args) => {
    let exists = await table.filter({userID : msg.author.id}).run();

    const action  = args[0];
    const name    = args[0] ? args[1] : undefined;
    const content = name ? msg.content.split(' ').slice(3).join(' ') : undefined;

    if (!action) {
        return;
    }
    if (action === 'register') {
        if (!name) return msg.reply('You must specify the name.');
        if (!content) return msg.reply('You must specify tag\'s content.');
        if (content.includes('@everyone')) {
            return msg.reply('Please dont include `@everyone` in your tag, thanks')
        }
        if (!exists[0]) {
            await table.insert({
                userID  : msg.author.id,
                tags    : [{
                    name    : name,
                    content : content
                }]
            }).run()
        } else {

            if (exists[0].tags.length >= 5) {
                return msg.reply('You cannot store more than 5 tags.')
            }

            for (let i = 0; i < exists[0].tags.length; i++) {
                if (exists[0].tags[i]['name'] === name) {
                    return msg.reply('You already have a tag with this name.')
                }
            }

            let appendToArray = (table, uArray, doc) => r.table(table)
                .filter({userID : msg.author.id})
                .update(object => ({ [uArray]: object(uArray)
                    .default([]).append(doc) }))
                .run();
            appendToArray('tags', 'tags', {name : name, content : content})

        }
        let ar = [
            `Action : ADD`,
            `= Status : ✔ =`,
            `Tag name : ${name}`,
        ];
        msg.channel.send(ar.join('\n'), {code : "asciidoc"})
    } else if (action !== 'register' && action !== 'list' && action !== 'delete'){

        let tagName = action;
        try {
            let tagValue = exists[0]['tags'].filter(o => o.name === tagName)[0]['content'];
            msg.channel.send(tagValue)
        } catch (e) {
            return msg.reply('This tag does not exists!')
        }

    } else if (action === 'list') {
        let textArray = [`= 🔖Available tags for ${msg.author.username}🔖 =`];

        if (exists[0].tags.length < 1 || !exists[0]) {
            return msg.reply('You do not have any tags available')
        }
        for (let i = 0; i < exists[0].tags.length; i++) {
            textArray.push(`${i + 1}). ${exists[0].tags[i].name}`);
        }
        msg.channel.send(textArray.join('\n'), {code : 'asciidoc'})
    } else if (action === 'delete') {

        let toDelete = name;
        if (exists[0].tags.length < 1 || !exists[0]) {
            return msg.reply('You do not have any tags available')
        }
        if (!exists[0].tags.filter(o => o.name === toDelete)[0]) {
            return msg.reply('This tag does not exists!')
        }
        let p = exists[0].tags;
        function findInd(element) {
            return element.name === toDelete
        }
        p.findIndex(findInd);

        let appendToArray = (table, uArray) => r.table(table)
            .filter({userID : msg.author.id})
            .update(object => ({ [uArray]: object(uArray)
                .default([]).deleteAt(p.findIndex(findInd)) }))
            .run();

        appendToArray('tags', 'tags');

        let ar = [
            `Action : DELETE`,
            `= Status : ✔ =`,
            `Tag name : ${toDelete}`,
        ];
        msg.channel.send(ar.join('\n'), {code : "asciidoc"})
    }

};

exports.help = {
    category: 'fun',
    usage: 'register [name][content] : -tag [name] : -tag list',
    description: 'register and use tags for saying things',
    detail: 'By using tag you will able to make custom tags that will say things',
    botPerm: ['SEND_MESSAGES'],
    authorPerm: [],
    alias: [
        'ta'
    ],
    example: 'register tagName This message will apear when doing -tag tagName'
};
