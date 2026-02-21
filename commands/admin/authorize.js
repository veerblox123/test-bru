const { SlashCommandBuilder } = require("discord.js");
const Auth = require("../../models/auth");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("authorize")
        .setDescription("Give full bot access")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.editReply("❌ Only owner can use this");
        }

        const user = interaction.options.getUser("user");

        await Auth.create({
            userId: user.id,
            guildId: interaction.guild.id
        });

        await interaction.editReply(`✅ Authorized ${user.tag}`);
    }
};