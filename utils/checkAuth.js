const Auth = require("../models/auth");

module.exports = async (interaction) => {
  const OWNER_ID = process.env.OWNER_ID;

  // 👑 Owner bypass
  if (interaction.user.id === OWNER_ID) return true;

  const data = await Auth.findOne({
    guildId: interaction.guild.id,
    userId: interaction.user.id,
  });

  return !!data;
};