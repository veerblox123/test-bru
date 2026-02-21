const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Manage bad words")
        .addStringOption(opt =>
            opt.setName("action")
                .setDescription("add/remove")
                .setRequired(true)
                .addChoices(
                    { name: "add", value: "add" },
                    { name: "remove", value: "remove" }
                )
        )
        .addStringOption(opt =>
            opt.setName("word")
                .setDescription("Word")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const action = interaction.options.getString("action");
        const word = interaction.options.getString("word").toLowerCase();

        let config = await Config.findOne({ guildId: interaction.guild.id });
        if (!config) config = await Config.create({ guildId: interaction.guild.id });

        if (action === "add") {
            if (!config.badWords.includes(word)) {
                config.badWords.push(word);
            }
        } else {
            config.badWords = config.badWords.filter(w => w !== word);
        }

        await config.save();

        await interaction.editReply(`✅ Filter updated`);
    }
};