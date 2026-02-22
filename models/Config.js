const mongoose = require("mongoose");

module.exports =
    mongoose.models.Config ||
    mongoose.model(
        "Config",
        new mongoose.Schema({
            guildId: String,
            automod: { type: Boolean, default: false },
            badWords: { type: Array, default: [] }, // ✅ IMPORTANT
            ignoredChannels: { type: Array, default: [] },
            ignoredRoles: { type: Array, default: [] },
            filterLinks: { type: Boolean, default: false }
        })
    );