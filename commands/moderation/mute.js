const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("mute")
        .setDescription("Mute a user")
        .addUserOption(opt =>
            opt
                .setName("user")
                .setDescription("User to mute") // ✅ FIXED
                .setRequired(true)
        )
        .addIntegerOption(opt =>
            opt
                .setName("time")
                .setDescription("Mute time in seconds")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const time = interaction.options.getInteger("time") || 600;

        const member = await interaction.guild.members.fetch(user.id);
        await member.timeout(time * 1000);

        await interaction.reply(`🔇 Muted ${user.tag} for ${time} seconds`);
    }
};