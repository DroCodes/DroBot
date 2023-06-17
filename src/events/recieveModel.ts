import {EmbedBuilder, Events, Interaction, TextChannel} from "discord.js";
import {GuildSettings} from "../data/schemas/guildSettings";
import {IRoleMessage} from "../interfaces/IRoleMessage";


module.exports = {
    name: Events.InteractionCreate,
    once: false,

    async execute(interaction: Interaction) {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId != 'reactionRoleMessage') return

        const { guildId, guild, client } = interaction;

        if (guild === null) return

        const channelId = interaction.fields.getTextInputValue('channelId');
        const messageInput = interaction.fields.getTextInputValue('messageInput');

        const getChannel =  await client.channels.fetch(channelId)

        if (getChannel === null || !getChannel.isTextBased) {
            console.log('getChannel is undefined')
            return
        }
        console.log('Channel: ' + getChannel)

        const getGuild = await GuildSettings.findById(guildId)

        if (getGuild === null) {
            console.log('getGuild is null')
            return
        }

        const embed = new EmbedBuilder()
            .setColor(15418782)
            .setDescription(messageInput)

        const channel = getChannel as TextChannel
        const sendMessage = await channel.send({embeds: [embed]});

        let messageId = sendMessage.id.toString()
        const reactionRolesMessage : IRoleMessage = {channelId: channel.id, messageId: messageId }

        await getGuild.roleMessage!.push(reactionRolesMessage)
        await getGuild.save();

        await interaction.reply(`message sent in #${channel.id}, the message id is ${sendMessage.id}`)
    }
}