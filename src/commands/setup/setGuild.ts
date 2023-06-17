import {PermissionFlagsBits, SlashCommandBuilder} from "discord.js";
import { GuildSettings } from '../../data/schemas/guildSettings'

module.exports = {
    data: new SlashCommandBuilder()
        .setName('set-guild')
        .setDescription('Sets the guild id')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),


    async execute(interaction: any) {
        const { guildId } = interaction;
        const findGuild = await GuildSettings.find({_id: guildId})

        if (findGuild.length != 0) {
            interaction.reply('guild id is already saved')
            return
        }

        const guildSettings = new GuildSettings({
            _id: guildId.toString()
        })

        const saveGuildId = await guildSettings.save()

        if (!saveGuildId) {
            interaction.reply('there was an issue saving the guildId')
        }

        interaction.reply(`Guild id save successfully, set to ${guildId}`)
    }
}