const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Permet d\'afficher la latence du bot'),
    category: 'utilities',
    run(interaction) {
        interaction.reply({
            fetchReply: true,
            content: '**Calcul de la latence actuelle en cours...**'
        }).then((m) => {
            const ping = m.createdTimestamp - interaction.createdTimestamp;
            m.edit(`**Ping: \`${ping}ms\`**`);
        });
    }
}