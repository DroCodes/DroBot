import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {GuildSettings} from "../../data/schemas/guildSettings";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-welcome')
        .setDescription('Sets the welcome channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option: any) =>
        option.setName('welcome-message')
            .setDescription('message to be sent in welcome channel')
            .setRequired(true))
        .addChannelOption((option: any) =>
        option.setName('welcome-channel')
            .setDescription('Set the welcome channel')
            .setRequired(true)),

    isDevelopment: false,

    async execute(interaction: any) {
        const { guildId } = interaction
        const channel = interaction.options.getChannel('welcome-channel')
        const welcomeMessage = interaction.options.getString('welcome-message')

        if (channel === null) {
            interaction.reply('Channel has not been given')
            return
        }

        const findGuild = await GuildSettings.findOneAndUpdate({
            _id: guildId.toString()
        },
            {
                welcomeChannel: channel.id.toString(),
                welcomeMessage: welcomeMessage
            })

        if (findGuild === null) {
            const guildSettings = new GuildSettings({
                _id: guildId.toString(),
                welcomeChannel: channel.id.toString(),
                welcomeMessage: welcomeMessage
            })

            await guildSettings.save()
            interaction.reply(`Guild Id set to ${guildId} and Welcome Channel has been set to ${channel.id}`)
            return;
        }

        interaction.reply(`Welcome Channel has been set to ${channel.id}`)
    }
}