const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("automod")
    .setDescription("Toggle automod")
    .addStringOption(opt =>
      opt.setName("state")
        .setDescription("on/off")
        .setRequired(true)
        .addChoices(
          { name: "on", value: "on" },
          { name: "off", value: "off" }
        )
    ),

  restricted: true,

  async execute(interaction) {
    const state = interaction.options.getString("state");

    await interaction.reply(`⚙️ Automod ${state}`);
  },
};