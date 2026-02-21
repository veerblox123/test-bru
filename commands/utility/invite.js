const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Check invite stats")
        .addUserOption(opt =>
            opt.setName("user")
                .setDescription("User to check")
        ),

    async execute(interaction) {
        const target = interaction.options.getUser("user") || interaction.user;

        const invites = await interaction.guild.invites.fetch();

        const userInvites = invites.filter(inv => inv.inviter && inv.inviter.id === target.id);

        let total = 0;
        userInvites.forEach(inv => {
            total += inv.uses || 0;
        });

        await interaction.editReply(
            `📨 ${target.tag} has **${total} invites**`
        );
    }
};