const { SlashCommandBuilder } = require("discord.js");
const Auth = require("../../models/Auth");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("authorize")
        .setDescription("Give full bot access")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User")
                .setRequired(true)
        ),

    restricted: true,

    async execute(interaction) {
        const user = interaction.options.getUser("user");

        await Auth.findOneAndUpdate(
            { guildId: interaction.guild.id, userId: user.id },
            {},
            { upsert: true }
        );

        await interaction.reply(`✅ ${user.tag} is now authorized`);
    },
};