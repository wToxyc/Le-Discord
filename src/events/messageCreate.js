module.exports = {
    name: 'messageCreate',
    async run(message, client) {
        if (message.author.bot || !message.member) return;
        if (!client.db[message.member.id]) {
            client.db[message.member.id] = {
                messages: 0,
                voiceTime: 0,
                warns: []
            }
        }
        client.db[message.member.id].messages++;

        if (message.channel.id === '1106643179450675271') {
            const reactions = ['👍', '👎'];
            reactions.forEach((reaction) => {
                message.react(reaction);
            });
        }
    }
}