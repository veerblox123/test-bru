const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick a user")
        .addUserOption(opt =>
            opt
                .setName("user")
                .setDescription("User to kick") // ✅ FIXED
                .setRequired(true)
        )
        .addStringOption(opt =>
            opt
                .setName("reason")
                .setDescription("Reason for kick")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id);

        await member.kick();
        await interaction.reply(`👢 Kicked ${user.tag}`);
    }
};