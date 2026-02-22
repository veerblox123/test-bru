require("dotenv").config();
const fs = require("fs");
const mongoose = require("mongoose");

const { 
    Client, 
    GatewayIntentBits, 
    Collection, 
    ActivityType 
} = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();


// 📥 LOAD COMMANDS
const folders = fs.readdirSync("./commands");
for (const folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const command = require(`./commands/${folder}/${file}`);

        if (!command.data) {
            console.log(`❌ Skipping ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);
        console.log(`✅ Loaded command: ${command.data.name}`);
    }
}


// 📥 LOAD EVENTS
const eventFiles = fs.readdirSync("./events").filter(f => f.endsWith(".js"));

for (const file of eventFiles) {
    require(`./events/${file}`)(client);
}


// 🔌 MONGODB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("❌ Mongo error:", err));


// ✅ READY EVENT + STATUS ROTATION
client.once("clientReady", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const statuses = [
        {
            name: `watching over ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`,
            type: ActivityType.Watching
        },
        {
            name: "made with ❤️ by Veer",
            type: ActivityType.Playing
        },
        {
            name: "with Decken Host",
            type: ActivityType.Playing
        }
    ];

    let i = 0;

    setInterval(() => {
        const status = statuses[i];

        // update dynamic user count each loop
        if (i === 0) {
            status.name = `watching over ${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} users`;
        }

        client.user.setActivity(status.name, { type: status.type });

        i++;
        if (i >= statuses.length) i = 0;

    }, 10000); // 10 sec
});


// 🚀 LOGIN
client.login(process.env.TOKEN);