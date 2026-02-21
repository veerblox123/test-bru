const mongoose = require("mongoose");

module.exports = mongoose.models.Auth || mongoose.model("Auth", new mongoose.Schema({
    userId: String,
    guildId: String
}));