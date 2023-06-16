import {Events, Role, User} from 'discord.js'
import {GuildSettings} from "../data/schemas/guildSettings";

module.exports = {
    name: Events.MessageReactionRemove,
    once: false,

    async execute(reaction: any, user: User) {
        console.log('message reaction remove')
        if (user.bot) return

        const getGuild = await GuildSettings.findById(reaction.message.guild.id)

        if (!getGuild || !getGuild.roleMessage) {
            return
        }

        if (reaction.message.partial) {
            // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
            try {
                await reaction.message.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                // Return as `reaction.message.author` may be undefined/null
                return;
            }
        }

        for (const e of getGuild.roleMessage) {
            if (e.messageId === reaction.message.id) {
                for (let i = 0; i < e.role!.length; i++) {
                    if (reaction.emoji.name === e.emojiName![i]) {
                        const role = reaction.message.guild.roles.cache.find(
                            (role: Role) => role.id.toString() === e.role![i].toString()
                        );
                        if (role) {
                            try {
                                const member = await reaction.message.guild.members.fetch(user.id);
                                await member.roles.remove(role);
                                console.log(`${role.name} removed from member ${member.displayName}`);
                            } catch (error) {
                                console.error(`Failed to remove ${role.name} role:`, error);
                            }
                        }
                    }
                }
            }
        }
    }
}