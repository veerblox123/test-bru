const mongoose = require("mongoose"); // ✅ THIS LINE IS MISSING

module.exports = mongoose.models.Warn || mongoose.model("Warn", new mongoose.Schema({
    userId: String,
    guildId: String,
    reason: String,
    moderator: String,
    date: { type: Date, default: Date.now }
}));