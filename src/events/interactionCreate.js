const { EmbedBuilder, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const tickets = [];

function updateEmbed(category, commands) {
    const embed = new EmbedBuilder();
    switch (category) {
        case 'utilities':
            embed.setTitle('Commandes utilitaires');
            break;
        case 'moderation':
            embed.setTitle('Commandes de modération');
            break;
        case 'security':
            embed.setTitle('Commandes de sécurité');
            break;
    }

    const filter = (command) => command.category === category;
    commands.filter(filter).forEach((command) => {
        embed.addFields({
            name: command.data.name,
            value: command.data.description
        });
    });

    embed.setFooter({
        text: 'Tapez "/help <command>" pour plus d\'informations.'
    });
    return embed;
}

module.exports = {
    name: 'interactionCreate',
    run(interaction, client) {
        const commands = client.commands;
        if (interaction.isCommand()) {
            const command = commands.find((command) => command.data.name === interaction.commandName);
            command.run(interaction, client);
        } else if (interaction.isButton()) {
            const userId = interaction.user.id;
            switch (interaction.customId) {
                case 'accept-rules':
                    const guild = interaction.guild;
                    const members = guild.members.cache;
                    const member = members.get(userId);
                    const memberRole = '1108300915959676999';
                    const channels = guild.channels.cache;
                    const welcomeChannelId = '1106573562954928253';
                    const welcomeChannel = channels.get(welcomeChannelId);

                    if (!member.roles.cache.has(memberRole)) {
                        member.roles.add(memberRole);
                        welcomeChannel.send(`**➜ ${member} a rejoint le serveur ! Souhaitez-lui la bienvenue !**`);
                    }

                    interaction.reply({
                        ephemeral: true,
                        content: 'Merci d\'avoir lu et accepter notre règlement !'
                    });
                    break;
                case 'open-ticket':
                    const everyoneRoleId = interaction.guild.id;
                    const modId = '1106989535700717629';
                    const botId = '1106574126707130450';
                    const ticketParentId = '1107646345059254302';
                    const filter = (ticket) => ticket.user === userId;
                    if (!tickets.find(filter)) {
                        interaction.guild.channels.create({
                            parent: ticketParentId,
                            name: `ticket-${tickets.length + 1}`,
                            permissionOverwrites: [{
                                id: everyoneRoleId,
                                deny: [PermissionFlagsBits.ViewChannel]
                            }, {
                                id: userId,
                                allow: [PermissionFlagsBits.ViewChannel]
                            }, {
                                id: modId,
                                allow: [PermissionFlagsBits.ViewChannel]
                            }, {
                                id: botId,
                                allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.EmbedLinks, PermissionFlagsBits.ManageChannels]
                            }]
                        }).then((channel) => {
                            const userTag = interaction.user.tag;
                            const userAvatarURL = interaction.user.displayAvatarURL({ dynamic: true });
                            channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setTitle(`Ticket-${tickets.length + 1}`)
                                        .setAuthor({
                                            name: userTag,
                                            iconURL: userAvatarURL
                                        })
                                        .setDescription('Bienvenue dans votre ticket !\nNotre équipe fait de son mieux pour fournir un **support de qualité** !\nVous pouvez d\'ailleurs l\'aider en indiquant les **informations suivantes**\n```Objet du ticket\nDescription\nInformations complémentaires```\nVous pouvez également mentionner les membres concernés ainsi qu\'ajouter des preuves à l\'appui de votre signalement ! *(si nécessaire)*')
                                        .setFooter({
                                            text: 'Vous êtes prié(e) de ne pas mentionner le staff !'
                                        })
                                ],
                                components: [
                                    new ActionRowBuilder()
                                        .addComponents(
                                            new ButtonBuilder()
                                                .setCustomId('close-ticket')
                                                .setEmoji('🔒')
                                                .setLabel('Fermer le ticket')
                                                .setStyle(ButtonStyle.Secondary)
                                        )
                                ]
                            });
                            tickets.push({
                                user: userId,
                                channel: channel.id
                            });
                            interaction.reply({
                                ephemeral: true,
                                content: `Votre <#${channel.id}> a été créé !`
                            });
                        });
                    } else {
                        interaction.reply({
                            ephemeral: true,
                            content: 'Vous ne pouvez ouvrir qu\'un seul ticket à la fois !'
                        });
                    }
                    break;

                case 'close-ticket':
                    if (interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
                        const ticketId = interaction.channel.id;
                        const filter = (ticket) => ticket.channel = ticketId;
                        const ticket = tickets.find(filter);
                        const ticketIndex = tickets.indexOf(ticket);
                        tickets.splice(ticketIndex, 1);
                        interaction.channel.delete();
                    } else {
                        interaction.reply('Seul l\'équipe du serveur peut librement fermer les tickets !');
                    }
                    break;
            }
        } else if (interaction.isStringSelectMenu()) {
            switch (interaction.customId) {
                case 'select-category':
                    const embed = updateEmbed(interaction.values[0], commands);
                    interaction.update({ embeds: [embed] });
                    break;
            }
        }
    }
}