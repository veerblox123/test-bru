const { EmbedBuilder } = require("discord.js");
const log = require("../utils/logger");

module.exports = (client) => {

    client.on("messageDelete", async (message) => {
        if (!message.guild || message.author?.bot) return;

        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("🗑️ Message Deleted")
            .addFields(
                { name: "User", value: message.author.tag, inline: true },
                { name: "Channel", value: `${message.channel}`, inline: true },
                { name: "Content", value: message.content || "None" }
            )
            .setTimestamp();

        log(message.guild, "message", embed);
    });

    client.on("messageUpdate", async (oldMsg, newMsg) => {
        if (!oldMsg.guild || oldMsg.author?.bot) return;

        const embed = new EmbedBuilder()
            .setColor("Yellow")
            .setTitle("✏️ Message Edited")
            .addFields(
                { name: "User", value: oldMsg.author.tag, inline: true },
                { name: "Before", value: oldMsg.content || "None" },
                { name: "After", value: newMsg.content || "None" }
            )
            .setTimestamp();

        log(oldMsg.guild, "message", embed);
    });

};