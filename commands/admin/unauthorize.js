const { SlashCommandBuilder } = require("discord.js");
const Auth = require("../../models/Auth");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unauthorize")
        .setDescription("Remove access")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User")
                .setRequired(true)
        ),

    restricted: true,

    async execute(interaction) {
        const user = interaction.options.getUser("user");

        await Auth.findOneAndDelete({
            guildId: interaction.guild.id,
            userId: user.id,
        });

        await interaction.reply(`❌ ${user.tag} removed from authorized`);
    },
};