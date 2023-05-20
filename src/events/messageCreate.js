const User = require('../models/User');

module.exports = {
    name: 'messageCreate',
    async run(message) {
        if (message.author.bot || !message.member) return;
        if (!await User.exists({ id: message.member.id })) {
            await new User({ id: message.member.id }).save();
        }
        const user = await User.findOne({ id: message.member.id });
        user.stats.messages++;
        await user.save();

        if (message.channel.id === '1106643179450675271') {
            const reactions = ['👍', '👎'];
            reactions.forEach((reaction) => {
                message.react(reaction);
            });
        }
    }
}