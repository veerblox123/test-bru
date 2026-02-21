const Auth = require("../models/Auth");
const { ChannelType, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {

        // 🔘 BUTTON HANDLER
        if (interaction.isButton()) {

            // 🎫 CREATE TICKET
            if (interaction.customId === "create_ticket") {

                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel]
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                        },
                        {
                            id: process.env.STAFF_ROLE,
                            allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages]
                        }
                    ]
                });

                // 🔘 CLOSE BUTTON
                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId("close_ticket")
                        .setLabel("Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                );

                await channel.send({
                    content: `🎫 Welcome ${interaction.user}`,
                    components: [row]
                });

                return interaction.reply({
                    content: `✅ Ticket created: ${channel}`,
                    ephemeral: true
                });
            }

            // ❌ CLOSE TICKET BUTTON
            if (interaction.customId === "close_ticket") {

                // Check staff role
                if (!interaction.member.roles.cache.has(process.env.STAFF_ROLE)) {
                    return interaction.reply({
                        content: "❌ Only staff can close tickets",
                        ephemeral: true
                    });
                }

                await interaction.reply("🔒 Closing ticket...");
                setTimeout(() => {
                    interaction.channel.delete();
                }, 2000);
            }
        }

        // 💬 COMMAND HANDLER
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        await interaction.deferReply();

        try {
            const userId = interaction.user.id;

            if (userId === process.env.OWNER_ID) {
                return await command.execute(interaction, client);
            }

            const isAuth = await Auth.findOne({
                userId,
                guildId: interaction.guild.id
            });

            const restricted = [
                "ban","kick","mute","warn",
                "automod","filter","raidmode",
                "authorize","unauthorize"
            ];

            if (restricted.includes(command.data.name) && !isAuth) {
                return interaction.editReply("❌ Not authorized");
            }

            await command.execute(interaction, client);

        } catch (err) {
            console.error(err);
            interaction.editReply("❌ Error");
        }
    });
};