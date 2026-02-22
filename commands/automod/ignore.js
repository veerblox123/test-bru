const { SlashCommandBuilder } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ignore")
        .setDescription("Ignore a channel or role from automod")
        .addChannelOption(opt =>
            opt.setName("channel")
                .setDescription("Channel to ignore")
                .setRequired(false)
        )
        .addRoleOption(opt =>
            opt.setName("role")
                .setDescription("Role to ignore")
                .setRequired(false)
        ),

    restricted: true,

    async execute(interaction) {
        const channel = interaction.options.getChannel("channel");
        const role = interaction.options.getRole("role");

        if (!channel && !role) {
            return interaction.reply({
                content: "❌ Provide a channel or role",
                ephemeral: true
            });
        }

        let config = await Config.findOne({ guildId: interaction.guild.id });

        if (!config) {
            config = await Config.create({
                guildId: interaction.guild.id,
                ignoredChannels: [],
                ignoredRoles: []
            });
        }

        // CHANNEL
        if (channel) {
            if (!config.ignoredChannels.includes(channel.id)) {
                config.ignoredChannels.push(channel.id);
            }
        }

        // ROLE
        if (role) {
            if (!config.ignoredRoles.includes(role.id)) {
                config.ignoredRoles.push(role.id);
            }
        }

        await config.save();

        await interaction.reply({
            content: `✅ Ignored ${
                channel ? channel.toString() : ""
            } ${role ? role.toString() : ""}`,
        });
    },
};