const sf = require('snekfetch');
const discord = require('discord.js');
const config = require('../config/config.json');
const cooldown = require('../functions/cooldown.js');
// TODO: Use a map to log the usage of each key

exports.run = async (client, msg, args) => {
    if (!args[0]) return msg.channel.send('Please give a location');
    if (cooldown(msg, 'weather', 60, 'This command has a cooldown of **1 Minute**!')) {
        let loc = encodeURIComponent(args.join('+'));
        let res = await sf.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${config.GOOGLEKEY}`);
        if (res.body.results.length === 0) return msg.channel.send('Nothing found!');
        let resS = res.body.results[0];
        let geocodelocation = resS.formatted_address;
        let params = resS.geometry.location.lat + "," + resS.geometry.location.lng;
        let wea = await sf.get(`https://api.darksky.net/forecast/${config.WEATHERKEY[Math.floor(config.WEATHERKEY.length * Math.random())]}/${params}?exclude=minutely,hourly,flags&units=si`);
        let tempF = Math.round(wea.body.currently.temperature);
        let humidity = `${wea.body.currently.humidity * 100}%`;
        let wind = wea.body.currently.windSpeed;
        let cloudCover = `${wea.body.currently.cloudCover * 100}%`;

        const embed = new discord.RichEmbed()
            .setTitle('Weather | ' + geocodelocation)
            .setDescription(wea.body.daily.summary)
            .addField(':thermometer: Temperature', `${tempF}°C (feels like ${Math.round(wea.body.currently.apparentTemperature)}°C)`, true)
            .addField(':sweat_drops: Humidity', `${humidity}`, true)
            .addField(':wind_blowing_face: Wind Speed', `${wind } m/s`,true)
            .addField(':white_sun_small_cloud: Cloud Coverage', `${cloudCover}`,true)
            .addField(':sunny: UV Index', wea.body.currently.uvIndex, true)
            .addField(':parking: Pressure', wea.body.currently.pressure + ' hPa', true)
            .setFooter('May')
            .setTimestamp();

        msg.channel.send({embed})
    }
};

exports.help = {
    category   : 'util',
    usage      : '[location]',
    description: 'Get the weather',
    detail     : `Gives you an idea about the weather in different locations`,
    botPerm    : ['SEND_MESSAGES'],
    authorPerm : [],
    example    : "london",
    alias      : [
        null
    ],
    example    : 'New York City'
};
