import {Interaction, PermissionFlagsBits, SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-role-message')
        .setDescription('adds role')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction: Interaction) {
        console.log('Sending Model')
    }
}