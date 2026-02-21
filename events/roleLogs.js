const { EmbedBuilder } = require("discord.js");
const log = require("../utils/logger");

module.exports = (client) => {

    client.on("guildMemberUpdate", (oldMember, newMember) => {
        const added = newMember.roles.cache.filter(r => !oldMember.roles.cache.has(r.id));
        const removed = oldMember.roles.cache.filter(r => !newMember.roles.cache.has(r.id));

        if (added.size > 0) {
            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("➕ Role Added")
                .setDescription(`${newMember.user.tag} got ${added.first()}`)
                .setTimestamp();

            log(newMember.guild, "role", embed);
        }

        if (removed.size > 0) {
            const embed = new EmbedBuilder()
                .setColor("Orange")
                .setTitle("➖ Role Removed")
                .setDescription(`${newMember.user.tag} lost ${removed.first()}`)
                .setTimestamp();

            log(newMember.guild, "role", embed);
        }
    });

};