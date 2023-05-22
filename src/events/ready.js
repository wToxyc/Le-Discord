const { ActivityType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const User = require('../models/User');
require('colors');

module.exports = {
    name: 'ready',
    run(client) {
        console.log(`[CLIENT] Logged in as ${client.user.tag}!`.blue);

        const guild = client.guilds.cache.get('1106573562078314586');

        const statsChannel = guild.channels.cache.get('1106642679682576394');
        const members = guild.members.cache.filter((member) => !member.user.bot && member.voice.channel);
        
        setInterval(() => {
            client.user.setActivity(`${guild.memberCount} membres`, { type: ActivityType.Watching });
            statsChannel.setName(`💎〡Membres : ${guild.memberCount}`);
            members.forEach(async (member) => {
                console.log(member);
                if (!await User.exists({ id: member.user.id })) {
                    await new User({ id: member.user.id }).save();
                }
                const user = await User.findOne({ id: member.user.id });
                user.stats.voiceTime++;
                await user.save();
            });
        }, 60000);

        const commands = client.commands.map((command) => command.data);
        guild.commands.set(commands);

        // guild.channels.cache.get('1106643062194716833').send({
        //     embeds: [
        //         new EmbedBuilder()
        //             .setTitle('Menu des tickets')
        //             .setDescription('Vous souhaitez **signaler un bug** afin de nous aider à améliorer le serveur ?\nVous êtes **victime de harcèlement** ?\nOu bien avez-vous simplement envie d\'**intégrer notre équipe** ?\n\nN\'hésitez surtout pas et créer vite un ticket !\nNotre équipe vous prendra en charge le plus rapidement possible !')
        //             .setFooter({
        //                 text: 'Tout ticket ouvert sans raison valable sera sanctionné !'
        //             })
        //     ],
        //     components: [
        //         new ActionRowBuilder()
        //             .addComponents(
        //                 new ButtonBuilder()
        //                     .setCustomId('open-ticket')
        //                     .setEmoji('📩')
        //                     .setLabel('Ouvrir un ticket')
        //                     .setStyle(ButtonStyle.Secondary)
        //             )
        //     ]
        // });

        // guild.channels.cache.get('1106602497117798492').send({
        //     embeds: [
        //         new EmbedBuilder()
        //             .setTitle('Règlement du serveur')
        //             .setDescription('👋 Bonjour / Bonsoir à toi et bienvenue sur Le Discord !\n\nNotre serveur a pour but de __rassembler une communauté__ **créative et de partage** __suffisante__ pour organiser **divers événements**.\n\nToutefois il y a des **valeurs auxquelles nous tenons particulièrement** et que nous te demanderons de __respecter__ afin de __maintenir__ une **bonne ambiance** sur le serveur.\n\n**Voici nos 6 règles** que __chaque utilisateur__ devra __lire et respecter__ pour que le serveur se porte le mieux possible :\n\n**1.** Votre profil *(nom d\'utilisateur, biographie, statut ou avatar)* ne doit __offenser__, __provoquer__, __critiquer__ ou __manquer de respect__ à un **individu** ou à un **groupe d\'individus** *(religion, ethnie, mouvement...)*.\n\n**2.** Il en va de même pour __vos propos__ qui en plus ne doivent être **extrêmes ou abordant des sujets polémiques** __tout en prenant__ ouvertement __parti__ *(politique, croyance...)*, que ce soit dans un salon **textuel** ou **vocal**.\n\n**3.** Vous devez __laisser de côté__ votre **égo** lorsque vous entrez dans ce serveur : __il n\'y a de place ici__ que pour **l\'humilité**.\n\n**4.** Les **humiliations**, la **fuite de données personnelles** et les **attaques informatiques** sur autrui ou sur le serveur sont __strictement prohibées__.\n\n**5.** __Vous devez contribuer__ à l\'**entretien** d\'un **environnement sain** : la "***pollution***" __textuelle__ *(flood, spam, majuscules, double poste, mass émojis...)* et __vocale__ *(soundboard, écho, bruit de fond, flood vocal...)* est donc **interdite**.\n\n**6.** Enfin, __vous êtes__ également __contraint__ de __respecter__ la **loi** et les [conditions d\'utilisations](https://discord.com/terms) de la **plateforme**.\n\n🙏 Merci d\'avoir __pris le temps__ de **lire** notre __règlement__ et **à très vite** sur Le Discord !')
        //             .setFooter({
        //                 text: 'En cliquant sur le bouton ci-dessous, vous vous engagez à respecter les règles du serveur.'
        //             })
        //     ],
        //     components: [
        //         new ActionRowBuilder()
        //             .addComponents(
        //                 new ButtonBuilder()
        //                     .setCustomId('accept-rules')
        //                     .setEmoji('📑')
        //                     .setLabel('Accepter les règles')
        //                     .setStyle(ButtonStyle.Secondary)
        //             )
        //     ]
        // });
    }
}