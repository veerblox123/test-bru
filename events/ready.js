module.exports = (client) => {
    client.once("clientReady", () => {
        console.log(`✅ Logged in as ${client.user.tag}`);
    });
};