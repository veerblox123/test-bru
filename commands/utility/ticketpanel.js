const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticketpanel")
        .setDescription("Send ticket panel"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("🎫 Support Tickets")
            .setDescription("Click below to create a ticket")
            .setColor("Blue");

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("create_ticket")
                .setLabel("Create Ticket")
                .setStyle(ButtonStyle.Primary)
        );

        await interaction.editReply({ embeds: [embed], components: [row] });
    }
};