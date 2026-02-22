const Auth = require("../models/Auth");

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            // 🔒 Restricted system
            if (command.restricted) {
                const isOwner = interaction.guild.ownerId === interaction.user.id;

                const isAuthorized = await Auth.findOne({
                    guildId: interaction.guild.id,
                    userId: interaction.user.id,
                });

                if (!isOwner && !isAuthorized) {
                    return interaction.reply({
                        content: "❌ You are not authorized to use this command.",
                        ephemeral: true,
                    });
                }
            }

            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);

            if (!interaction.replied) {
                interaction.reply({
                    content: "❌ Error executing command",
                    ephemeral: true,
                });
            }
        }
    });
};