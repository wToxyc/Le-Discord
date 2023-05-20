const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Permet de supprimer des messages dans le salon')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName('messages')
                .setDescription('Le nombre de messages que vous souhaitez supprimer')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    category: 'moderation',
    syntax: '<messages>',
    permission: 'Gérer les messages',
    async run(interaction) {
        const messages = interaction.options.getInteger('messages');
        if (interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
            const { size } = await interaction.channel.bulkDelete(messages);
            interaction.reply(size == 1 ? '**`1` message a été supprimé.**' : `**\`${size}\` messages ont été supprimés.**`).then((message) => {
                setTimeout(() => {
                    message.delete().catch(() => { });
                }, 3000);
            }).catch(() => { });
        } else {
            interaction.reply({
                ephemeral: true,
                content: 'Je n\'ai pas la permission de supprimer des messages.'
            });
        }
    }
}