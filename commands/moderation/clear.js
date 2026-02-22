const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear messages")
    .addIntegerOption(opt =>
      opt.setName("amount").setDescription("Amount").setRequired(true)
    ),

  restricted: true,

  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");

    await interaction.channel.bulkDelete(amount);

    await interaction.reply({
      content: `🧹 Deleted ${amount} messages`,
      ephemeral: true,
    });
  },
};