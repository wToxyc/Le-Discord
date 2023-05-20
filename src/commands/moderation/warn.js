const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Permet de warn un utilisateur')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('L\'utilisateur que vous souhaitez warn')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('La raison du warn')
                .setRequired(true)
        ),
    category: 'moderation',
    syntax: '<user> <reason>',
    permission: 'Gérer les messages',
    async run(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        
        if (!await User.exists({ id: user.id })) {
            await new User({ id: user.id }).save();
        }

        const userData = await User.findOne({ id: user.id });

        userData.warns.push({
            date: Date.now(),
            reason: reason,
            mod: interaction.user.id
        });

        await userData.save();

        interaction.reply(`**${user} a été warn pour \`${reason}\`.**`);
    }
}