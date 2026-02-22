const { SlashCommandBuilder } = require("discord.js");
const Auth = require("../../models/auth");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("authorize")
        .setDescription("Give access to user")
        .addUserOption(opt =>
            opt.setName("user").setDescription("User").setRequired(true)
        ),

    async execute(interaction) {

        if (interaction.user.id !== process.env.OWNER_ID) {
            return interaction.reply({ content: "❌ Owner only", ephemeral: true });
        }

        const user = interaction.options.getUser("user");

        await Auth.create({
            guildId: interaction.guild.id,
            userId: user.id
        });

        interaction.reply(`✅ ${user.tag} authorized`);
    }
};