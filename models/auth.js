const mongoose = require("mongoose");

module.exports = mongoose.models.Auth || mongoose.model("Auth",
    new mongoose.Schema({
        guildId: String,
        userId: String
    })
);