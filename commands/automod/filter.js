const { SlashCommandBuilder } = require("discord.js");
const Config = require("../../models/Config");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Add a word to automod filter")
        .addStringOption(opt =>
            opt.setName("word")
                .setDescription("Word to block")
                .setRequired(true)
        ),

    restricted: true,

    async execute(interaction) {
        const word = interaction.options.getString("word").toLowerCase();

        let config = await Config.findOne({ guildId: interaction.guild.id });

        // ✅ create config if not exists
        if (!config) {
            config = await Config.create({
                guildId: interaction.guild.id,
                automod: true,
                badWords: [],
                ignoredChannels: [],
                ignoredRoles: []
            });
        }

        // ✅ FIX: ensure array exists
        if (!config.badWords) config.badWords = [];

        if (config.badWords.includes(word)) {
            return interaction.reply({
                content: "❌ Word already exists",
                ephemeral: true
            });
        }

        config.badWords.push(word);
        await config.save();

        await interaction.reply(`✅ Added word: ${word}`);
    },
};