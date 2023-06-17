import { SlashCommandBuilder } from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test-command')
        .setDescription('test command'),

    isDevelopment: true,

    async execute(interaction: any) {
        console.log(typeof interaction)

        interaction.reply('test command')
    }
}