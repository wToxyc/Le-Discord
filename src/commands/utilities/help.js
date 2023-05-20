const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Permet d\'afficher le menu d\'aide ou des informations concernant une commande')
        .addStringOption(option =>
            option
                .setName('command')
                .setDescription('La commande dont on veut afficher des informations')
        ),
    category: 'utilities',
    syntax: '[command]',
    run(interaction, client) {
        let commandOption = interaction.options.getString('command');

        if (!commandOption) {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Menu d\'aide')
                        .setDescription('Bienvenue dans le menu d\'aide où vous pouvez obtenir des informations sur les commandes du bot !')
                        .setFooter({
                            text: 'Tapez "/help <command>" pour plus d\'informations.'
                        })
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId('select-category')
                                .setPlaceholder('Choississez une catégorie')
                                .addOptions(
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Utilitaires')
                                        .setDescription('Aide concernant les commandes utilitaires')
                                        .setValue('utilities'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Modération')
                                        .setDescription('Aide concernant les commandes de modération')
                                        .setValue('moderation'),
                                    new StringSelectMenuOptionBuilder()
                                        .setLabel('Sécurité')
                                        .setDescription('Aide concernant les commandes de sécurité')
                                        .setValue('security')
                                )
                        )
                ]
            });
        } else {
            const commands = client.commands;
            const command = commands.get(commandOption);
            if (command) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`Aide pour la commande ${command.data.name}`)
                            .addFields({
                                name: 'Description',
                                value: command.data.description
                            }, {
                                name: 'Catégorie',
                                value: command.category
                            }, {
                                name: 'Syntaxe',
                                value: `\`${command.syntax}\`` || 'Aucune'
                            }, {
                                name: 'Permission',
                                value: command.permission || 'Aucune'
                            })
                            .setFooter({
                                text: 'Tapez "/help" pour plus d\'informations.'
                            })
                    ]
                });
            } else {
                interaction.reply({
                    ephemeral: true,
                    content: 'Cette commande n\'existe pas !'
                });
            }
        }
    }
}