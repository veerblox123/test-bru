const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("automod")
        .setDescription("Enable or disable automod")
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

    async execute(interaction) {
        const state = interaction.options.getString("state");

        let config = await Config.findOne({ guildId: interaction.guild.id });
        if (!config) config = await Config.create({ guildId: interaction.guild.id });

        config.automod = state === "on";
        await config.save();

        await interaction.editReply(`🤖 Automod ${state}`);
    }
};