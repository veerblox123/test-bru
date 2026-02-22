const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const Warn = require('../../models/Warn');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('List warnings for a user')
    .addUserOption(opt => opt.setName('user').setDescription('User to fetch warnings for').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
    restricted: true,

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    try {
      const warns = await Warn.find({ guildId: interaction.guild.id, userId: user.id }).sort({ date: 1 });
      if (!warns.length) return interaction.reply({ content: user.tag + ' has no warnings.', ephemeral: true });

      const lines = warns.map((w, i) => '#'+(i+1)+' • '+w.reason+' — <@'+w.moderator+'> ('+new Date(w.date).toLocaleString()+')');
      const content = 'Warnings for ' + user.tag + ':\n' + lines.join('\n');
      await interaction.reply({ content });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch warnings.', ephemeral: true });
    }
  }
};
