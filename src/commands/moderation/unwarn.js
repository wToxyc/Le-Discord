const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unwarn')
        .setDescription('Permet de retirer le warn d\'un utilisateur')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('L\'utilisateur auquel vous souhaitez retirer un warn')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('warn')
                .setDescription('Le numéro du warn que vous souhaitez retirer')
                .setRequired(true)
                .setMinValue(1)
        ),
    category: 'moderation',
    syntax: '<user> <warn>',
    permission: 'Gérer les messages',
    async run(interaction) {
        const user = interaction.options.getUser('user');
        const warn = interaction.options.getInteger('warn');

        const userData = await User.findOne({ id: user.id });

        if (await User.exists({ id: user.id }) && userData.warns.length > 0) {
            if (userData.warns[warn - 1]) {
                userData.warns.splice(warn - 1, 1);
                await userData.save();

                interaction.reply(`**Le warn \`n°${warn}\` de ${user} a été retiré.**`);
            } else {
                interaction.reply({
                    ephemeral: true,
                    content: 'Ce warn n\'existe pas !'
                });
            }
        } else {
            interaction.reply({
                ephemeral: true,
                content: `${user} n'a aucun warn.`
            });
        }
    }
}