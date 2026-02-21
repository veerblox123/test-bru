const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ignore")
        .setDescription("Ignore a channel")
        .addChannelOption(opt =>
            opt.setName("channel")
                .setDescription("Channel to ignore")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");

        let config = await Config.findOne({ guildId: interaction.guild.id });
        if (!config) config = await Config.create({ guildId: interaction.guild.id });

        if (!config.ignoredChannels.includes(channel.id)) {
            config.ignoredChannels.push(channel.id);
        }

        await config.save();

        await interaction.editReply(`🚷 Ignoring ${channel}`);
    }
};