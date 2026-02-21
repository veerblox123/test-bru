const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const log = require("../../utils/logger");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban a user")
        .addUserOption(opt =>
            opt.setName("user").setDescription("User").setRequired(true)
        )
        .addStringOption(opt =>
            opt.setName("reason").setDescription("Reason")
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) { // ✅ async here

        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason";

        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) return interaction.editReply("❌ User not found");

        await member.ban({ reason });

        await interaction.editReply(`🔨 Banned ${user.tag}`);

        // ✅ LOG HERE (INSIDE FUNCTION)
        await log(interaction.guild, "mod", {
            title: "🔨 Ban",
            description: `${user.tag} banned by ${interaction.user.tag}\nReason: ${reason}`
        });
    }
};