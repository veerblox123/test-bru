const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban user")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    restricted: true,

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const member = await interaction.guild.members.fetch(user.id).catch(() => null);

        if (!member) {
            return interaction.reply({ content: "❌ User not found", ephemeral: true });
        }

        await member.ban();

        await interaction.reply(`✅ Banned ${user.tag}`);
    },
};