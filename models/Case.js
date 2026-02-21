const mongoose = require("mongoose");

module.exports = mongoose.models.Case || mongoose.model("Case", new mongoose.Schema({
    caseId: Number,
    action: String,
    userId: String,
    moderator: String,
    reason: String,
    guildId: String,
    date: { type: Date, default: Date.now }
}));