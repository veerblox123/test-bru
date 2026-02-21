const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear messages")
        .addIntegerOption(opt =>
            opt.setName("amount")
                .setDescription("Number of messages")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const amount = interaction.options.getInteger("amount");

        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({ content: `🧹 Cleared ${amount}`, ephemeral: true });
    }
};