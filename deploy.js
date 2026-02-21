const { REST, Routes } = require("discord.js");
require("dotenv").config();

const commands = [];
const fs = require("fs");

const commandFiles = fs.readdirSync("./commands").flatMap(folder =>
    fs.readdirSync(`./commands/${folder}`).map(file => `./commands/${folder}/${file}`)
);

for (const file of commandFiles) {
    const command = require(file);
    if (command.data) {
        commands.push(command.data.toJSON());
        console.log(`✅ Loaded command: ${command.data.name}`);
    }
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("🚀 Registering GUILD commands...");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID // ✅ THIS IS THE KEY
            ),
            { body: commands }
        );

        console.log("✅ Guild commands registered!");
    } catch (error) {
        console.error(error);
    }
})();