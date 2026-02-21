const mongoose = require("mongoose"); // ✅ THIS LINE IS MISSING

module.exports = mongoose.models.Config || mongoose.model("Config", new mongoose.Schema({
    guildId: String,
    automod: { type: Boolean, default: true },
    badWords: { type: [String], default: [] },
    raidMode: { type: Boolean, default: false },
    ignoredChannels: { type: [String], default: [] }
}));