import {EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {GuildSettings} from "../../data/schemas/guildSettings";
import { IRoleMessage } from "../../interfaces/IRoleMessage";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-role-message')
        .setDescription('adds role'),
        // .addChannelOption((option: any) =>
        // option.setName('channel')
        //     .setDescription('channel to send message')
        //     .setRequired(true))
        // .addStringOption((option: any) =>
        // option.setName('message')
        //     .setDescription('the message content')
        //     .setRequired(true)),

    async execute(interaction: any) {
        console.log('working')
        // const { guildId, guild, options } = interaction;
        //
        // const channel = options.getChannel('channel')
        // const message = options.getString('message');
        //
        // const getChannel = guild.channels.cache.get(channel.id.toString())
        //
        // const getGuild = await GuildSettings.findById(guildId)
        //
        // if (getGuild === null) {
        //     console.log('getGuild is null')
        //     return
        // }
        //
        //
        //
        // const embed = new EmbedBuilder()
        //     .setColor(15418782)
        //     .setDescription(message)
        //
        // const sendMessage = await getChannel.send({embeds: [embed]});
        //
        // let messageId = sendMessage.id.toString()
        // const reactionRolesMessage : IRoleMessage = {channelId: channel.id, messageId: messageId }
        //
        // await getGuild.roleMessage!.push(reactionRolesMessage)
        // await getGuild.save();
        //
        // await interaction.reply(`message sent in #${channel}, the message id is ${sendMessage.id}`)
    }
}