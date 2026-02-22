const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Check invite stats")
    .addUserOption(opt =>
      opt.setName("user").setDescription("User")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user") || interaction.user;

    const embed = new EmbedBuilder()
      .setColor("Aqua")
      .setTitle("Invite log")
      .setDescription(`>> ${user.username} has 0 invites`)
      .addFields(
        { name: "Joins", value: "0", inline: true },
        { name: "Left", value: "0", inline: true },
        { name: "Fake", value: "0", inline: true },
        { name: "Rejoins", value: "0", inline: true }
      )
      .setFooter({ text: `Requested by ${interaction.user.username}` });

    await interaction.reply({ embeds: [embed] });
  },
};