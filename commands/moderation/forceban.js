const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("forceban")
        .setDescription("Ban user by ID")
        .addStringOption(opt =>
            opt.setName("userid")
                .setDescription("User ID")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const id = interaction.options.getString("userid");

        await interaction.guild.members.ban(id);
        await interaction.reply(`🔨 Force banned ID ${id}`);
    }
};