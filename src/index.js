const { Client, Collection } = require('discord.js');
const { connectDb } = require('./services/mongoose');
const { token } = require('./config.json');
require('colors');

const client = new Client({ intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'GuildVoiceStates'] });

client.commands = new Collection();
client.events = new Collection();

const handlers = ['CommandUtil', 'EventUtil'];
handlers.forEach((handler) => require(`./util/handlers/${handler}`)(client));

connectDb().catch(() => console.log('[ERROR] Failed to connect the database!'.red));

client.login(token);