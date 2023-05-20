const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Permet de vérouiller le salon')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    category: 'security',
    permission: 'Gérer les messages',
    run(interaction) {
        interaction.channel.permissionOverwrites.set([{
            id: interaction.guild.id,
            deny: [PermissionFlagsBits.SendMessages]
        }, {
            id: '1106989535700717629',
            allow: [PermissionFlagsBits.SendMessages]
        }]);

        interaction.reply('**Le salon a été vérouillé.**');
    }
}