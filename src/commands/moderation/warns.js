const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warns')
        .setDescription('Permet d\'afficher la liste des warns d\'un utilisateur')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('L\'utilisateur dont vous souhaitez afficher la liste des warns')
                .setRequired(true)
        ),
    category: 'moderation',
    syntax: '<user>',
    permission: 'Gérer les messages',
    async run(interaction) {
        const user = interaction.options.getUser('user');
        const userData = await User.findOne({ id: user.id });

        if (await User.exists({ id: user.id }) && userData.warns.length > 0) {
            const warnList = new EmbedBuilder()
                .setAuthor({
                    name: user.tag,
                    iconURL: user.displayAvatarURL({ dynamic: true })
                })
                .setColor('Blurple')
                .setTitle('Liste des warns');
            
            userData.warns.forEach((warn, index) => {
                const warnDate = Math.floor(warn.date / 1000);
                warnList.addFields({
                    name: `Warn n°${index + 1}`,
                    value: `Date: <t:${warnDate}> (<t:${warnDate}:R>)\nRaison: \`${warn.reason}\`\nModérateur: <@${warn.mod}>`
                });
            });

            interaction.reply({ embeds: [warnList] });
        } else {
            interaction.reply({
                ephemeral: true,
                content: `${user} n'a aucun warn.`
            });
        }
    }
}