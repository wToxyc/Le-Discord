const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Permet d\'afficher vos statistiques ou celle d\'un utilisateur')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('L\'utilisateur dont vous souhaitez afficher les statistiques')
        ),
    category: 'utilities',
    syntax: '[user]',
    async run(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;
        const stats = client.db[interaction.user.id];
        if (stats) {
            const voiceTime = {
                hours: Math.floor(stats.voiceTime / 60),
                minutes: stats.voiceTime % 60
            }
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: user.tag,
                            iconURL: user.displayAvatarURL({ dynamic: true })
                        })
                        .setTitle('Statistiques')
                        .addFields({
                            name: 'Messages',
                            value: Number(stats.messages).toString()
                        }, {
                            name: 'Activité vocale',
                            value: `\`${voiceTime.hours}\` heures et \`${voiceTime.minutes}\` minutes`
                        })
                ]
            });
        } else {
            interaction.reply({
                ephemeral: true,
                content: 'Aucune statistique trouvée pour cet utilisateur.'
            });
        }
    }
}