import { SlashCommandBuilder } from 'discord.js';

module.exports = {
    development: true,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong'),
    async execute(interaction: any) {
        await interaction.reply('pong!');
    }
}