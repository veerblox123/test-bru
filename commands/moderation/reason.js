const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Case = require('../../models/Case');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('reason')
    .setDescription('Update the reason for a case')
    .addIntegerOption(opt => opt.setName('caseid').setDescription('Case ID to update').setRequired(true))
    .addStringOption(opt => opt.setName('reason').setDescription('New reason').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    restricted: true,

  async execute(interaction) {
    const caseId = interaction.options.getInteger('caseid');
    const newReason = interaction.options.getString('reason');
    try {
      const updated = await Case.findOneAndUpdate({ guildId: interaction.guild.id, caseId }, { reason: newReason }, { new: true });
      if (!updated) return interaction.reply({ content: `Case #${caseId} not found.`, ephemeral: true });

      await interaction.reply({ content: `Updated reason for case #${caseId}.` });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to update reason.', ephemeral: true });
    }
  }
};
