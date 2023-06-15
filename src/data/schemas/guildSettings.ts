import { Schema, model } from 'mongoose';

interface IRoleEmoji {
    role: string;
    emojiName: string;
}

interface IGuildSettings {
    guildId: string;
    welcomeChannel?: string;
    welcomeMessage?: string;
    roleEmoji?: IRoleEmoji[];
}

const GuildSettingsSchema = new Schema<IGuildSettings>({
    guildId: { type: String, required: true },
    welcomeChannel: { type: String },
    welcomeMessage: { type: String },
    roleEmoji: [{ role: String, emojiName: String }]
});

const GuildSettings = model<IGuildSettings>('guildSettings', GuildSettingsSchema);

export { GuildSettings };
