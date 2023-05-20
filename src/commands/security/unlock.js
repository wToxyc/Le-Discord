const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Permet de dévérouiller le salon')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    category: 'security',
    permission: 'Gérer les messages',
    run(interaction) {
        interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
            SendMessages: null
        });

        interaction.channel.permissionOverwrites.edit('1106989535700717629', {
            SendMessages: null
        });

        interaction.reply('**Le salon a été dévérouillé.**');
    }
}