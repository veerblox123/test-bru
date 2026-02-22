const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("raidmode")
        .setDescription("Toggle raid mode")
        .addStringOption(opt =>
            opt.setName("state")
                .setDescription("on/off")
                .setRequired(true)
                .addChoices(
                    { name: "on", value: "on" },
                    { name: "off", value: "off" }
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
        restricted: true,

    async execute(interaction) {
        const state = interaction.options.getString("state");

        let config = await Config.findOne({ guildId: interaction.guild.id });
        if (!config) config = await Config.create({ guildId: interaction.guild.id });

        config.raidMode = state === "on";
        await config.save();

        await interaction.editReply(`🚨 Raid mode ${state}`);
    }
};