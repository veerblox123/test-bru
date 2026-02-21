const { EmbedBuilder } = require("discord.js");
const log = require("../utils/logger");

module.exports = (client) => {

    client.on("guildMemberAdd", (member) => {
        const embed = new EmbedBuilder()
            .setColor("Green")
            .setTitle("📥 Member Joined")
            .setDescription(`${member.user.tag}`)
            .setTimestamp();

        log(member.guild, "member", embed);
    });

    client.on("guildMemberRemove", (member) => {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("📤 Member Left")
            .setDescription(`${member.user.tag}`)
            .setTimestamp();

        log(member.guild, "member", embed);
    });

};