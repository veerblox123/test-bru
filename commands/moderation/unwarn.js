const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unwarn')
    .setDescription('Remove a specific warning from a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to remove warning from').setRequired(true))
    .addIntegerOption(opt => opt.setName('index').setDescription('Warning index to remove (1-based)').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    restricted: true,

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const index = interaction.options.getInteger('index');
    try {
      const warns = await Warn.find({ guildId: interaction.guild.id, userId: user.id }).sort({ date: 1 });
      if (!warns.length) return interaction.reply({ content: user.tag + ' has no warnings.', ephemeral: true });
      if (index < 1 || index > warns.length) return interaction.reply({ content: 'Invalid warning index.', ephemeral: true });

      const target = warns[index - 1];
      await Warn.deleteOne({ _id: target._id });

      await interaction.reply({ content: `Removed warning #${index} for ${user.tag}.` });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to remove warning.', ephemeral: true });
    }
  }
};
