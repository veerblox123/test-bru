const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Case = require('../../models/Case');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('case')
    .setDescription('Show details for a case by ID')
    .addIntegerOption(opt => opt.setName('caseid').setDescription('Case ID number').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const caseId = interaction.options.getInteger('caseid');
    try {
      const c = await Case.findOne({ guildId: interaction.guild.id, caseId });
      if (!c) return interaction.reply({ content: `Case #${caseId} not found.`, ephemeral: true });

      const content = `Case #${c.caseId}\nAction: ${c.action}\nUser: <@${c.userId}>\nModerator: <@${c.moderator}>\nReason: ${c.reason}\nDate: ${new Date(c.date).toLocaleString()}`;
      await interaction.reply({ content });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch case.', ephemeral: true });
    }
  }
};
