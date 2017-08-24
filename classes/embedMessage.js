const Discord = require('discord.js');

const embed = new Discord.RichEmbed();
class embedMessage {
    constructor(msg) {
        this.message = msg;
    }

    descEmbed(options) {
        if (!options) {
            throw new Error('You must specify the options, options list {content, type}');
        }
        if (options.type === 'desc') {
            if (!options.content) {
                throw new Error('You did not specify the text inside the constructor options.');
            } else {
                embed.setDescription(options.content);
            }
            if (options.color) {
                embed.setColor(options.color);
            }
            this.message.channel.send({embed});
        } else {
            throw new Error('You chose descEmbed but your option does not have "desc" in it.');
        }
    }
    advanced(options) {
        /**
         *@returns {Error}
         */
        if (!options) {
            throw new Error('You must specify at list one option, list {desc, footer, thumbnail, title, author fields[field1, content, field2, content]}');
        }

        const embed = new Discord.RichEmbed();

        /**
         *@returns {Object}
         *@param {boolean} inline
         *@param {string} title
         *@param {string} content
         */
        if (options.fields) {
            for (let i = 0; i < options.fields.length; i++) {
                let inline;
                if (!options.fields[i].inline) {
                    inline = false;
                } else if (options.fields[i].inline === true) {
                    inline = true;
                }
                embed.addField(options.fields[i].title, options.fields[i].content, inline);
            }
        }

        /**
         *@param {String} desc
         */
        if (options.desc) {
            embed.setDescription(options.desc);
        }

        /**
         *@param {String} footer
         */
        if (options.footer) {
            embed.setFooter(options.footer);
        }

        /**
         *@param {String} title
         */
        if (options.title) {
            embed.setTitle(options.title);
        }

        /**
         *@param {String} thumbnail
         */
        if (options.thumbnail) {
            embed.setThumbnail(options.thumbnail);
        }

        /**
         *@param {String} author
         */
        if (options.author) {
            embed.setAuthor(options.author.name, options.author.pic);
        }

        if (options.color) {
            embed.setColor(options.color);
        }

        this.message.channel.send({embed}); // Send the embed after all the options been selected
    }
}
module.exports = embedMessage;
