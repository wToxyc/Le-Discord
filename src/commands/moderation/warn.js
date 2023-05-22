const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
    async run(interaction, client) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        
        if (!client.db[user.id]) {
            client.db[user.id] = {
                messages: 0,
                voiceTime: 0,
                warns: []
            }
        }
        client.db[user.id].warns.push({
            reason: reason,
            date: Date.now(),
            mod: interaction.user.id
        });
        interaction.reply(`**${user} a été warn pour \`${reason}\`.**`);
    }
}