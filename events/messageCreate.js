const Config = require("../models/Config");

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        try {
            if (!message.guild || message.author.bot) return;

            const config = await Config.findOne({ guildId: message.guild.id });

            // ❌ If no config or automod off → skip
            if (!config || !config.automod) return;

            // ❌ Ignore channel
            if (config.ignoredChannels?.includes(message.channel.id)) return;

            // ❌ Ignore roles
            if (message.member.roles.cache.some(r => config.ignoredRoles?.includes(r.id))) return;

            // =========================
            // 🚨 BAD WORD FILTER
            // =========================
            const badWords = [
                "fuck",
                "bitch",
                "asshole",
                "nigga",
                "idiot",
                "stupid"
            ];

            const content = message.content.toLowerCase();

            if (badWords.some(word => content.includes(word))) {
                await message.delete().catch(() => {});

                await message.channel.send({
                    content: `⚠️ ${message.author}, watch your language!`,
                });

                return;
            }

            // =========================
            // 🚨 LINK FILTER (OPTIONAL)
            // =========================
            if (config.filterLinks) {
                const linkRegex = /(https?:\/\/[^\s]+)/g;

                if (linkRegex.test(content)) {
                    await message.delete().catch(() => {});

                    await message.channel.send({
                        content: `🚫 ${message.author}, links are not allowed!`,
                    });

                    return;
                }
            }

        } catch (err) {
            console.error("Automod error:", err);
        }
    });
};