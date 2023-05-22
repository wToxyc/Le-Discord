const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

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
    async run(interaction, client) {
        const user = interaction.options.getUser('user');
        const warn = interaction.options.getInteger('warn') - 1;

        if (client.db[user.id] && client.db[user.id].warns[warn]) {
            client.db[user.id].warns.splice(warn, 1);
            interaction.reply(`**Le warn \`n°${warn + 1}\` de ${user} a été retiré.**`);
        } else {
            interaction.reply({
                ephemeral: true,
                content: 'Ce warn n\'existe pas !'
            });
        }
    }
}