const { Client, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
require('colors');

const client = new Client({ intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'GuildVoiceStates'] });

client.commands = new Collection();
client.events = new Collection();

const handlers = ['CommandUtil', 'EventUtil'];
handlers.forEach((handler) => require(`./util/handlers/${handler}`)(client));

client.db = require('./database.json');

setInterval(() => {
    fs.writeFileSync(__dirname + '/database.json', JSON.stringify(client.db));
}, 1.8e+6);

client.login(token);