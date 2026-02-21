const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Case = require('../../models/Case');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cases')
    .setDescription('List cases for a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to list cases for').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    try {
      const cases = await Case.find({ guildId: interaction.guild.id, userId: user.id }).sort({ caseId: 1 });
      if (!cases.length) return interaction.reply({ content: `${user.tag} has no cases.`, ephemeral: true });

      const lines = cases.map(c => `#${c.caseId} • ${c.action} — ${c.reason} — <@${c.moderator}>`);
      const content = `Cases for ${user.tag}:\n` + lines.join('\n');
      await interaction.reply({ content });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch cases.', ephemeral: true });
    }
  }
};
