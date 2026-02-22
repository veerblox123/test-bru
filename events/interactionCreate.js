const Auth = require("../models/auth");

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        try {

            // 👑 OWNER BYPASS
            if (interaction.user.id === process.env.OWNER_ID) {
                return command.execute(interaction);
            }

            // 🌐 NORMAL COMMAND
            if (!command.restricted) {
                return command.execute(interaction);
            }

            // 🔒 CHECK AUTH
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

            command.execute(interaction);

        } catch (err) {
            console.error(err);
            interaction.reply({ content: "❌ Error", ephemeral: true });
        }
    });
};