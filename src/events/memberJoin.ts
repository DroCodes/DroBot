import {EmbedBuilder, Events} from 'discord.js'
import {GuildSettings} from "../data/schemas/guildSettings";

module.exports = {
    name: Events.GuildMemberAdd,

    async execute(Client: any) {
        const { guild, id } = Client

        console.log('Test' + Number(guild.id))

        const results = await GuildSettings.findOne({
            guildId: guild.id.toString()
        })

        if (!results) {
            return
        }

        const { welcomeChannel, welcomeMessage } = results;
        const channel = guild.channels.cache.get(welcomeChannel);
        const data = [channel, welcomeMessage]

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Welcome')
            .setDescription(data[1].replace(/@/g, `<@${id}>`))

        data[0].send({
            embeds: [embed]
        })
    }
}