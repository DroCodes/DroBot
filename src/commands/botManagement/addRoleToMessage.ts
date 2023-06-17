import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import {GuildSettings} from "../../data/schemas/guildSettings";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-role')
        .setDescription('Adds role to message')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption((option: any) =>
            option.setName('message-id')
                .setDescription('message to add the role to')
                .setRequired(true)
        )
        .addRoleOption((option: any) =>
            option.setName('role')
                .setDescription('role to add to the message')
                .setRequired(true))
        .addStringOption((option: any) =>
            option.setName('emoji')
                .setDescription('message to add emoji to')
                .setRequired(true)),

    isDevelopment: false,

    async execute(interaction: any) {
        const { guildId, guild, options} = interaction;

        const messageId = options.getString('message-id')
        const role = options.getRole('role')
        const emoji = options.getString('emoji')

        const getGuild = await GuildSettings.findById(guildId)

        if (getGuild === null) {
            interaction.reply('Please set the guild id')
            return
        }

        if (guild.roleMessage! === null) {
            interaction.reply('Please create a message with /add-role-message')
            return
        }

        let emojiName : any;
        let channel;
        if (emoji.startsWith('<')) {
            console.log("custom emoji")
            emojiName = emoji.split(':')
            console.log(emojiName[1])
            await getGuild.roleMessage!.forEach(e => {
                if (e.messageId === messageId) {
                    channel = guild.channels.cache.get(e.channelId)
                    e.role!.push(role.id.toString());
                    e.emojiName!.push(emojiName[1])
                    getGuild.save()
                }
            })
        } else {
            emojiName = emoji
            console.log("default emoji")
            await getGuild.roleMessage!.forEach(e => {
                if (e.messageId === messageId) {
                    channel = guild.channels.cache.get(e.channelId)
                    e.role!.push(role.id.toString());
                    e.emojiName!.push(emojiName)
                    getGuild.save()
                }
            })
        }

        if (channel === null) return

        const getMessage = await channel!.messages.fetch(messageId);

        await getMessage.react(emoji)

        interaction.reply('Role Added')
    }
}