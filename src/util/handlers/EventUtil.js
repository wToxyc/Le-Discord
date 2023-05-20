const fs = require('fs');
const path = require('path');
require('colors');

module.exports = (client) => {
    const eventFiles = fs.readdirSync(path.join(__dirname, '../../events/'));
    for (const file of eventFiles) {
        const event = require(`../../events/${file}`);
        if ('name' in event && 'run' in event) {
            client.events.set(event.name, event);
            if (event.once) {
                client.once(event.name, (...args) => event.run(...args, client));
            } else {
                client.on(event.name, (...args) => event.run(...args, client));
            }
        } else {
            console.log(`[WARNING] The event at /src/events/${file} is missing required "name" or "run" property,\nThe event has not been loaded!`.red);
        }
    }
    console.log(`[EVENT] ${client.events.size} events are now loaded!`.green);
}