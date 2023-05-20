const fs = require('fs');
const path = require('path');
require('colors');

module.exports = (client) => {
    const commandDirs = fs.readdirSync(path.join(__dirname, '../../commands/'));
    for (const dir of commandDirs) {
        const commandFiles = fs.readdirSync(path.join(__dirname, `../../commands/${dir}`)).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../../commands/${dir}/${file}`);
            if ('data' in command && 'run' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at /src/commands/${dir}/${file} is missing required "data" or "run" property!`.red);
            }
        }
    }
    console.log(`[COMMAND] ${client.commands.size} commands are now loaded!`.green);
}