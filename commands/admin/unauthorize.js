const { SlashCommandBuilder } = require("discord.js");
const Auth = require("../../models/auth");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unauthorize")
        .setDescription("Remove access")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User")
                .setRequired(true)
        ),

    async execute(interaction) {
        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.editReply("❌ Only owner");
        }

        const user = interaction.options.getUser("user");

        await Auth.deleteOne({
            userId: user.id,
            guildId: interaction.guild.id
        });

        await interaction.editReply(`❌ Removed ${user.tag}`);
    }
};