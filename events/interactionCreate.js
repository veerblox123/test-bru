const Auth = require("../models/auth");

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {
            // ✅ OWNER BYPASS (MOST IMPORTANT FIX)
            if (interaction.user.id === process.env.OWNER_ID) {
                return command.execute(interaction, client);
            }

            // ✅ ONLY CHECK AUTH IF COMMAND IS RESTRICTED
            if (command.restricted) {
                const data = await Auth.findOne({
                    guildId: interaction.guild.id,
                    userId: interaction.user.id
                });

                if (!data) {
                    return interaction.reply({
                        content: "❌ You are not authorized to use this command.",
                        ephemeral: true
                    });
                }
            }

            // ✅ NORMAL EXECUTION
            await command.execute(interaction, client);

        } catch (err) {
            console.error(err);

            if (interaction.replied || interaction.deferred) {
                interaction.followUp({
                    content: "❌ Error executing command",
                    ephemeral: true
                });
            } else {
                interaction.reply({
                    content: "❌ Error executing command",
                    ephemeral: true
                });
            }
        }
    });
};