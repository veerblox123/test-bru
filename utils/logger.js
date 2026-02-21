const { EmbedBuilder } = require("discord.js");

module.exports = async (guild, type, embed) => {
    try {
        let channelName;

        if (type === "mod") channelName = process.env.MOD_LOGS;
        if (type === "message") channelName = process.env.MESSAGE_LOGS;
        if (type === "member") channelName = process.env.MEMBER_LOGS;
        if (type === "role") channelName = process.env.ROLE_LOGS;
        if (type === "automod") channelName = process.env.AUTOMOD_LOGS;

        const channel = guild.channels.cache.find(c => c.name === channelName);
        if (!channel) return;

        await channel.send({ embeds: [embed] });

    } catch (err) {
        console.log("Logger error:", err.message);
    }
};