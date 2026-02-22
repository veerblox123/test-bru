const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Warn = require("../../models/Warn");
const Case = require("../../models/Case");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warn a user")
        .addUserOption((opt) =>
            opt.setName("user").setDescription("User to warn").setRequired(true)
        )
        .addStringOption((opt) => opt.setName("reason").setDescription("Reason for warning"))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
        restricted: true,

    async execute(interaction) {
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason") || "No reason";

        try {
            // determine next caseId for this guild
            const lastCase = await Case.findOne({ guildId: interaction.guild.id }).sort({ caseId: -1 }).limit(1);
            const nextCaseId = lastCase ? lastCase.caseId + 1 : 1;

            // save warn
            const warn = new Warn({
                userId: user.id,
                guildId: interaction.guild.id,
                reason,
                moderator: interaction.user.id
            });
            await warn.save();

            // create case
            const newCase = new Case({
                caseId: nextCaseId,
                action: "Warn",
                userId: user.id,
                moderator: interaction.user.id,
                reason,
                guildId: interaction.guild.id
            });
            await newCase.save();

            await interaction.reply(`⚠️ Warned ${user.tag}: ${reason} (Case #${nextCaseId})`);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: "An error occurred while saving the warn.", ephemeral: true });
        }
    }
};