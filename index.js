require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const mongoose = require("mongoose");

// ✅ CREATE CLIENT FIRST
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ✅ COMMAND COLLECTION
client.commands = new Collection();

// 📁 LOAD COMMANDS
const folders = fs.readdirSync("./commands");

for (const folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${folder}/${file}`);

        if (!command.data || !command.execute) {
            console.log(`❌ Skipping invalid command: ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);
        console.log(`✅ Loaded command: ${command.data.name}`);
    }
}

// 📁 LOAD EVENTS
const eventFiles = fs.readdirSync("./events");

for (const file of eventFiles) {
    require(`./events/${file}`)(client);
}

// 🔌 CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("MongoDB connection error:", err));

// 🤖 LOGIN
client.login(process.env.TOKEN);